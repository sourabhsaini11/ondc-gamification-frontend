import FileUpload from './FileUpload'
import { Button } from './ui/button'
import UserUploads from './Uploads'

const fields = [
  "Name",
  "Order ID",
  "Order Status",
  "Timestamp Created",
  "Total Price",
  "Phone Number",
];

const instructions = [
  "user22",
  "201-556-1019",
  'On creation- "active"  When order is partially_cancelled="partially_cancelled"  When order is completely cancelled="cancelled"  No other statuses to be included',
  'Date/Month/Year Hour:Minutes:Seconds 3/25/2025 12:03:00 This is the only format acceptable',
  `Price including=base price+ convenience charges+ delivery charges+ other charges-discount offered eg:1500`,
  `1st 3 digits+masking for next 3 digits+last 4 digits 733XXX1892`,
];

const downloadCSV = () => {
  const csvHeader = fields.join(",") + "\n";
  const csvInstructions = instructions.join(",") + "\n";
  const csvContent = csvHeader + csvInstructions;

  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "blueprint.csv";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};


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