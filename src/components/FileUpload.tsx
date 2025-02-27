import React, { useState } from 'react'
import axios from 'axios'

const FileUpload = () => {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState('')
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null

    if (selectedFile) {
      // Validate file type
      if (selectedFile.type !== 'text/csv' && !selectedFile.name.endsWith('.csv')) {
        setMessage('❌ Only CSV files are allowed.')
        setFile(null)
        setPreviewUrl(null)
        return
      }

      setFile(selectedFile)
      setMessage('')
      console.log('previewUrl', previewUrl)

      // Optional preview (CSV files are text-based, so no real "preview")
      const fileURL = URL.createObjectURL(selectedFile)
      setPreviewUrl(fileURL)
    } else {
      setFile(null)
      setPreviewUrl(null)
    }
  }

  const handleUpload = async () => {
    if (!file) {
      setMessage('❌ Please select a valid CSV file.')
      return
    }
    

    const formData = new FormData()
    formData.append('file', file)

    try {
      setUploading(true)
      setMessage('')
      const token = localStorage.getItem('token')
      const response = await axios.post('http://localhost:8000/api/v1/orders/upload-csv', formData, {
        headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` },
      })

      console.log('Upload Success:', response)
      setMessage('✅ File uploaded successfully!')
    } catch (error) {
      setMessage('❌ Error uploading file.')
      console.error(error)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 shadow-md rounded-xl w-full">
      <label className="w-full flex flex-col items-center px-4 py-6 bg-blue-50 border-2 border-dashed border-blue-300 rounded-lg cursor-pointer hover:bg-blue-100 transition duration-200">
        <span className="text-blue-700 font-medium">Click to select a CSV file</span>
        <input type="file" accept=".csv" className="hidden" onChange={handleFileChange} />
      </label>

      {file && (
        <div className="mt-4">
          <p className="text-sm text-gray-500">Selected File:</p>
          <p className="text-gray-800 font-semibold">{file.name}</p>
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={uploading || !file}
        className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50 transition duration-200"
      >
        {uploading ? 'Uploading...' : 'Upload CSV'}
      </button>

      {message && (
        <p className={`mt-3 text-sm font-semibold ${message.startsWith('✅') ? 'text-green-600' : 'text-red-500'}`}>
          {message}
        </p>
      )}
    </div>
  )
}

export default FileUpload
