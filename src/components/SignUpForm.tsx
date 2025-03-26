import { useState, ChangeEvent, FormEvent } from 'react';
import clsx from 'clsx';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InventoryImage from './../assets/inventoryImage.webp';
import { useNavigate, Link } from 'react-router-dom';
import { RegisterFormData } from '@/types';
import { useMutation } from 'react-query';
import { registerAPI } from '@/http/route';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

export default function SignupPage() {
  return (
    <div className="flex min-h-screen">
      <div className="flex flex-col items-center justify-center w-full sm:w-1/2 p-6">
        <div className="flex flex-col w-full gap-6">
          <SignupForm className="w-full" />
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

function SignupForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const [formData, setFormData] = useState<RegisterFormData>({ name: '', email: '', password: '' });
  const { toast } = useToast();
  const navigate = useNavigate();

  const registerMutation = useMutation({
    mutationFn: registerAPI,
    onSuccess: (response) => {
      toast({
        title: "Success",
        description: response.message || "Registration successful",
      });
      navigate('/login');
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.error || "Network error or server issue",
        variant: "destructive",
      });
    },
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [event.target.id]: event.target.value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    registerMutation.mutate(formData);
  };

  return (
    <div className={clsx('flex flex-col items-center justify-center min-h-screen w-full', className)} {...props}>
      <Card className="w-full max-w-md shadow-lg border border-blue-200">
        <CardHeader className="text-center bg-blue-600 text-white rounded-t-lg p-4">
          <CardTitle className="text-xl font-bold">Sign Up</CardTitle>
          <CardDescription className="text-blue-100">Welcome to Arambh!</CardDescription>
        </CardHeader>
        <CardContent className="bg-white p-6 rounded-b-lg">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name" className="text-blue-600">
                  Name *
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="border-blue-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-blue-600">
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="naman.pawar@thewitslab.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="border-blue-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password" className="text-blue-600">
                    Password *
                  </Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="border-blue-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition"
                disabled={registerMutation.isLoading}
              >
                {registerMutation.isLoading ? <Loader2 className='animate-spin' /> : 'Sign Up'}
              </Button>
            </div>
          </form>
          <div className="mt-4 text-center">
            <p>
              Already have an account?{' '}
              <Link to="/login" className="text-blue-700 hover:underline">
                Log in here
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
