import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { ExternalBlob } from '../backend';
import { loadFileMetadata, saveFileMetadata, deleteFileMetadata } from '../report/reportMetadataStore';

export interface MedicalFileMetadata {
  id: string;
  filename: string;
  size: number;
  uploadedAt: number;
}

const MEDICAL_FILES_QUERY_KEY = 'medicalFiles';

export function useMedicalFiles() {
  const { actor, isFetching: actorFetching } = useActor();
  const queryClient = useQueryClient();

  // Query to list all medical files
  const filesQuery = useQuery<MedicalFileMetadata[]>({
    queryKey: [MEDICAL_FILES_QUERY_KEY],
    queryFn: async () => {
      if (!actor) return [];
      
      try {
        const backendFiles = await actor.listMedicalFiles();
        
        // Merge backend data with local metadata
        const filesWithMetadata = backendFiles.map(([id, _blob]) => {
          const metadata = loadFileMetadata(id);
          return metadata || {
            id,
            filename: `file-${id.substring(0, 8)}`,
            size: 0,
            uploadedAt: Date.now(),
          };
        });

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

      // Upload to backend
      await actor.uploadMedicalFile(fileId, blob);

      // Save metadata locally
      const metadata: MedicalFileMetadata = {
        id: fileId,
        filename: file.name,
        size: file.size,
        uploadedAt: Date.now(),
      };
      saveFileMetadata(metadata);

      return metadata;
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

      // Delete local metadata
      deleteFileMetadata(fileId);

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
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to download file:', error);
      throw error;
    }
  };

  return {
    files: filesQuery.data || [],
    isLoading: filesQuery.isLoading || uploadMutation.isPending || deleteMutation.isPending,
    uploadFile: uploadMutation.mutateAsync,
    deleteFile: deleteMutation.mutateAsync,
    downloadFile,
  };
}
