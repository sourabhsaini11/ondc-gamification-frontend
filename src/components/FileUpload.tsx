import React, { useState, useRef } from 'react';
import { Loader2 } from 'lucide-react';
import { useMutation, useQueryClient } from 'react-query';
import { fileUpload } from '@/http/route';

const FileUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [, setPreviewUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const queryClient = useQueryClient();

  const uploadMutation = useMutation({
    mutationFn: fileUpload,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['uploads'] });
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = ''; 
    },
    onError: (error: any) => {
      setErrorMessage(error.response.data.message);
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;

    if (selectedFile) {
      if (selectedFile.type !== 'text/csv' && !selectedFile.name.endsWith('.csv')) {
        alert('❌ Only CSV files are allowed.');
        setFile(null);
        setPreviewUrl(null);
        event.target.value = ''; 
        return;
      }

      setFile(selectedFile);
      const fileURL = URL.createObjectURL(selectedFile);
      setPreviewUrl(fileURL);
    } else {
      setFile(null);
      setPreviewUrl(null);
    }
  };

  const handleUpload = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!file) {
      alert('❌ Please select a valid CSV file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    uploadMutation.mutate(formData);
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 shadow-md rounded-xl w-full">
      <label className="w-full flex flex-col items-center px-4 py-6 bg-blue-50 border-2 border-dashed border-blue-300 rounded-lg cursor-pointer hover:bg-blue-100 transition duration-200">
        <span className="text-blue-700 font-medium">Click to select a CSV file</span>
        <input
          type="file"
          accept=".csv"
          className="hidden"
          onChange={handleFileChange}
          ref={fileInputRef} 
        />
      </label>

      {file && (
        <div className="mt-4">
          <p className="text-sm text-gray-500">Selected File:</p>
          <p className="text-gray-800 font-semibold">{file.name}</p>
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={uploadMutation.isLoading || !file}
        className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50 transition duration-200 flex justify-center items-center"
      >
        {uploadMutation.isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Upload CSV'}
      </button>

      {uploadMutation.isSuccess && (
        <p className="mt-3 text-sm font-semibold text-green-600">✅ File uploaded successfully!</p>
      )}
      {uploadMutation.isError && <p className="mt-3 text-sm font-semibold text-red-500">❌ {errorMessage}</p>}
    </div>
  );
};

export default FileUpload;
