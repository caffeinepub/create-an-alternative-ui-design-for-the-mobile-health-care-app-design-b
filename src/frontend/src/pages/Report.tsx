import { useState } from 'react';
import { useRequireAuth } from '../hooks/useRequireAuth';
import { useMedicalFiles } from '../hooks/useMedicalFiles';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Upload, Download, Trash2, FileText } from 'lucide-react';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export default function Report() {
  useRequireAuth();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileToDelete, setFileToDelete] = useState<string | null>(null);
  const { files, isLoading, uploadFile, deleteFile, downloadFile } = useMedicalFiles();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error('Please select a file to upload');
      return;
    }

    try {
      await uploadFile(selectedFile);
      toast.success('Medical report uploaded successfully');
      setSelectedFile(null);
      // Reset file input
      const fileInput = document.getElementById('file-input') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload medical report');
    }
  };

  const handleDelete = async (fileId: string) => {
    try {
      await deleteFile(fileId);
      toast.success('Medical report deleted successfully');
      setFileToDelete(null);
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete medical report');
    }
  };

  const handleDownload = async (fileId: string, filename: string) => {
    try {
      await downloadFile(fileId, filename);
      toast.success('Medical report downloaded successfully');
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download medical report');
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const formatDate = (timestamp: number): string => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="container max-w-4xl py-8 pb-24">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Medical Reports</h1>
        <p className="text-muted-foreground">
          Save and manage your medical reports securely
        </p>
      </div>

      {/* Upload Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Save Medical Report</CardTitle>
          <CardDescription>
            Upload your medical reports, test results, and health documents
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="file-input">Select Report</Label>
              <Input
                id="file-input"
                type="file"
                onChange={handleFileSelect}
                accept="*/*"
              />
              {selectedFile && (
                <p className="text-sm text-muted-foreground">
                  Selected: {selectedFile.name} ({formatFileSize(selectedFile.size)})
                </p>
              )}
            </div>
            <Button
              onClick={handleUpload}
              disabled={!selectedFile || isLoading}
              className="w-full sm:w-auto"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Save Report
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Files List Section */}
      <Card>
        <CardHeader>
          <CardTitle>Saved Medical Reports</CardTitle>
          <CardDescription>
            {files.length === 0
              ? 'No reports saved yet'
              : `${files.length} report${files.length === 1 ? '' : 's'} saved`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading && files.length === 0 ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : files.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No medical reports saved yet</p>
              <p className="text-sm mt-2">Upload your first report above to get started</p>
            </div>
          ) : (
            <div className="space-y-3">
              {files.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <FileText className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{file.filename}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatFileSize(file.size)} • {formatDate(file.uploadedAt)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownload(file.id, file.filename)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setFileToDelete(file.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!fileToDelete} onOpenChange={() => setFileToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Medical Report</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this medical report? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => fileToDelete && handleDelete(fileToDelete)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
