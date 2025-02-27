import { useState, ChangeEvent, FormEvent } from 'react'
import clsx from 'clsx' // Import clsx
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import axios from 'axios'
import InventoryImage from './../assets/inventoryImage.webp'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom' // Import Link from react-router-dom

type FormData = {
  name: string
  email: string
  password: string
}

export default function SignupPage() {
  return (
    <div className="flex min-h-screen">
      {/* Left Side - Signup Form */}
      <div className="flex flex-col items-center justify-center w-full sm:w-1/2 bg-blue-50 p-6">
        <div className="flex flex-col w-full gap-6">
          <SignupForm className="w-full" /> {/* Ensure the form takes full width */}
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

function SignupForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', password: '' })
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [event.target.id]: event.target.value }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)

    try {
      const response = await axios.post('https://gamafication-node-backend-dev.thewitslab.com/api/v1/users/register', formData) // Ensure your backend has a signup endpoint
      console.log('response.status', response.status)
      if (response.status === 201) {
        navigate('/login') // Redirect to login page after successful signup
      }
    } catch (err) {
      console.log(err)
      setError('Signup failed. Please try again.')
    }
  }

  return (
    <div className={clsx('flex flex-col items-center justify-center min-h-screen w-full', className)} {...props}>
      <Card className="w-full max-w-md shadow-lg border border-blue-200">
        <CardHeader className="text-center bg-blue-600 text-white rounded-t-lg p-4">
          <CardTitle className="text-xl font-bold">Sign Up</CardTitle>
          {error && <p className="text-red-300">{error}</p>}
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
              >
                Sign Up
              </Button>
            </div>
          </form>
          {/* Link to Login page */}
          <div className="mt-4 text-center">
            <p className="">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-700 hover:underline">
                Log in here
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
