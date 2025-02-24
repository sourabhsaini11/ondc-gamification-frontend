import { LoginForm } from '@/components/LoginForm'
import InventoryImage from '../../assets/inventoryImage.webp'
import { useLocation } from 'react-router-dom'

export default function LoginPage() {
  const location = useLocation()
  
  return (
    <div className="flex min-h-screen">
      {/* Left Side - Login Form */}
      <div className="flex flex-col items-center justify-center w-full sm:w-1/2  p-6">
        <div className="flex flex-col w-full gap-6">
           <LoginForm className="w-full" />
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="w-1/2 bg-blue-50/40 flex justify-center items-center overflow-hidden ">
        <img
          src={InventoryImage}
          alt="Inventory"
          className="object-contain w-full h-full" // Ensures the image covers the full area of the container
        />
      </div>
    </div>
  )
}
