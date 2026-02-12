import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { ExternalBlob, MedicalFileMetadata as BackendMetadata } from '../backend';

export interface MedicalFileMetadata {
  id: string;
  filename: string;
  size: number;
  uploadedAt: number;
  contentType?: string;
}

const MEDICAL_FILES_QUERY_KEY = 'medicalFiles';

export function useMedicalFiles() {
  const { actor, isFetching: actorFetching } = useActor();
  const queryClient = useQueryClient();

  // Query to list all medical files using backend metadata
  const filesQuery = useQuery<MedicalFileMetadata[]>({
    queryKey: [MEDICAL_FILES_QUERY_KEY],
    queryFn: async () => {
      if (!actor) return [];
      
      try {
        const backendMetadata = await actor.listMedicalFilesMetadata();
        
        // Convert backend metadata to frontend format
        const filesWithMetadata = backendMetadata.map((meta: BackendMetadata) => ({
          id: meta.id,
          filename: meta.filename,
          size: Number(meta.size),
          uploadedAt: Number(meta.uploadedAt) / 1_000_000, // Convert nanoseconds to milliseconds
          contentType: meta.contentType || undefined,
        }));

        // Sort by upload date (newest first)
        filesWithMetadata.sort((a, b) => b.uploadedAt - a.uploadedAt);

        return filesWithMetadata;
      } catch (error) {
        console.error('Failed to list medical files:', error);
        throw error;
      }
    },
    enabled: !!actor && !actorFetching,
  });

  // Mutation to upload a file
  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      if (!actor) throw new Error('Actor not available');

      // Generate unique ID
      const fileId = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

      // Read file as bytes
      const arrayBuffer = await file.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);

      // Create ExternalBlob
      const blob = ExternalBlob.fromBytes(bytes);

      // Upload to backend with metadata
      await actor.uploadMedicalFile(
        fileId,
        blob,
        file.name,
        BigInt(file.size),
        file.type || null
      );

      return {
        id: fileId,
        filename: file.name,
        size: file.size,
        uploadedAt: Date.now(),
        contentType: file.type || undefined,
      };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [MEDICAL_FILES_QUERY_KEY] });
    },
  });

  // Mutation to delete a file
  const deleteMutation = useMutation({
    mutationFn: async (fileId: string) => {
      if (!actor) throw new Error('Actor not available');

      const success = await actor.deleteMedicalFile(fileId);
      if (!success) {
        throw new Error('File not found or already deleted');
      }

      return fileId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [MEDICAL_FILES_QUERY_KEY] });
    },
  });

  // Function to download/view a file
  const downloadFile = async (fileId: string, filename: string) => {
    if (!actor) throw new Error('Actor not available');

    try {
      const blob = await actor.getMedicalFile(fileId);
      if (!blob) {
        throw new Error('File not found');
      }

      // Get bytes and create download
      const bytes = await blob.getBytes();
      const fileBlob = new Blob([bytes]);
      const url = URL.createObjectURL(fileBlob);

      // Create temporary link and trigger download
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up
      setTimeout(() => URL.revokeObjectURL(url), 100);
    } catch (error) {
      console.error('Download error:', error);
      throw error;
    }
  };

  // Function to get file bytes for analysis
  const getFileBytes = async (fileId: string): Promise<Uint8Array | null> => {
    if (!actor) throw new Error('Actor not available');

    try {
      const blob = await actor.getMedicalFile(fileId);
      if (!blob) {
        return null;
      }

      const bytes = await blob.getBytes();
      return bytes;
    } catch (error) {
      console.error('Failed to get file bytes:', error);
      throw error;
    }
  };

  return {
    files: filesQuery.data || [],
    isLoading: uploadMutation.isPending || deleteMutation.isPending,
    isFetching: filesQuery.isFetching,
    uploadFile: uploadMutation.mutateAsync,
    deleteFile: deleteMutation.mutateAsync,
    downloadFile,
    getFileBytes,
  };
}
