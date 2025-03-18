import FileUpload from './FileUpload'
import { Button } from './ui/button'
import UserUploads from './Uploads'

const fields = [
  "order_id",
  "name",
  "domain",
  "total_price",
  "timestamp_created",
  "phone_number",
]

const downloadCSV = () => {
  const csvHeader = fields.join(",") + "\n";
  const blob = new Blob([csvHeader], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "blueprint.csv";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

const FileUploadWrapper = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white p-6 space-y-6">
      <div className="bg-gradient-to-r from-blue-500 to-blue-700 shadow-lg rounded-xl p-4 w-full max-w-2xl mx-auto">
        <div className="mt-1 flex flex-col gap-4 ">
          <div className='flex justify-end'>
            <Button
              variant="outline"
              className="max-w-sm bg-white text-blue-600 border-blue-600 hover:bg-blue-100 hover:border-blue-700 hover:text-blue-700 font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300"
              onClick={downloadCSV}
            >
            Download BluePrint
          </Button>


          </div>
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