import { useState, ChangeEvent, FormEvent } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import axios from 'axios'
import { useAuth } from '../services/AuthContext'
import { Link } from 'react-router-dom'

type FormData = {
  email: string
  password: string
}

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const { login } = useAuth()
  const [formData, setFormData] = useState<FormData>({ email: '', password: '' })
  const [error, setError] = useState<string | null>(null)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [event.target.id]: event.target.value }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)

    try {
      const response = await axios.post('https://gamafication-node-backend-dev.thewitslab.com/api/v1/users/login', formData)
      if (response.data.token) {
        login(response.data.token, response.data.user)
        // Handle login token (e.g., store in localStorage or context)
      }
    } catch (err) {
      console.log(err)
      setError('Login failed. Please try again.')
    }
  }

  return (
    <div className={cn('flex flex-col items-center justify-center min-h-screen w-full', className)} {...props}>
      <Card className="w-full max-w-md shadow-lg border border-blue-200">
        <CardHeader className="text-center bg-blue-600 text-white rounded-t-lg p-4">
          <CardTitle className="text-xl font-bold">Sign In</CardTitle>
          {error && <p className="text-red-300">{error}</p>}
          <CardDescription className="text-blue-100">Welcome to Arambh!</CardDescription>
        </CardHeader>
        <CardContent className="bg-white p-6 rounded-b-lg">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
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
                  <a href="#" className="ml-auto text-sm text-blue-500 underline-offset-4 hover:underline">
                    Forgot your password?
                  </a>
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
              <div className="flex items-center">
                <input type="checkbox" id="rememberMe" className="mr-2" />
                <Label htmlFor="rememberMe" className="text-blue-600 text-sm">
                  Remember Me
                </Label>
              </div>
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition"
              >
                Sign In
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="mt-4 text-center">
        <p className="">
          Don't have an account{' '}
          <Link to="/signup" className="text-blue-700 hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  )
}
