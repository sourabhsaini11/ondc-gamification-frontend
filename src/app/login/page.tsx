import { LoginForm } from '@/components/login-form'
import InventoryImage from '../../assets/inventoryImage.webp'

export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
      {/* Left Side - Login Form */}
      <div className="flex flex-col items-center justify-center w-full sm:w-1/2 bg-blue-50 p-6">
        <div className="flex flex-col w-full gap-6">
          <LoginForm className="w-full" /> {/* Ensure the form takes full width */}
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="w-1/2 flex justify-center items-center overflow-hidden">
        <img
          src={InventoryImage}
          alt="Inventory"
          className="object-cover w-full h-full" // Ensures the image covers the full area of the container
        />
      </div>
    </div>
  )
}
