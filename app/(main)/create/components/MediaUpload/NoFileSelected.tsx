import { CloudUpload } from "lucide-react"

const NoFileSelected = ({ onClick }: { onClick: () => void }) => (
  <div
    className="absolute inset-0 flex flex-col items-center justify-center space-y-2 text-black cursor-pointer text-white"
    onClick={onClick}
  >
    <CloudUpload className="w-8 h-8" />
    <p className="text-sm font-medium">click to upload</p>
  </div>
)

export default NoFileSelected
