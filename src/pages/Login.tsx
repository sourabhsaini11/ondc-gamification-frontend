import { LoginForm } from '@/components/LoginForm';
import InventoryImage from '@/assets/inventoryImage.webp'
export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
      <div className="flex flex-col items-center justify-center w-full sm:w-1/2 p-6">
        <div className="flex flex-col w-full gap-6">
          <LoginForm className="w-full" />
        </div>
      </div>
      <div className="w-1/2 bg-blue-50/40 flex justify-center items-center overflow-hidden">
        <img
          src={InventoryImage}
          alt="Inventory"
          className="object-contain w-full h-full"
        />
      </div>
    </div>
  );
}
