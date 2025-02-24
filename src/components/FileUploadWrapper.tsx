import FileUpload from './FileUpload'
import UserUploads from './Uploads'

const FileUploadWrapper = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white p-6 space-y-6">
      {/* Upload Section - Smaller Height */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-700 shadow-lg rounded-xl p-4 w-full max-w-2xl mx-auto">
        {/* <h1 className="text-xl font-semibold text-center text-white">Upload CSV</h1> */}
        <div className="mt-1">
          <FileUpload />
        </div>
      </div>

      <div className="flex-1">
        <UserUploads />
      </div>
    </div>
  )
}

export default FileUploadWrapper
