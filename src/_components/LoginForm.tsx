import { useState, ChangeEvent, FormEvent } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'

import { useMutation } from 'react-query'
import { login } from '@/http/route'
import { Loader2 } from 'lucide-react'

type FormData = {
  email: string
  password: string
}

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const [formData, setFormData] = useState<FormData>({ email: '', password: '' })
  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      toast({
        title: 'Success',
        description: response.message || 'Login successful',
      })
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Network error or server issue',
        variant: 'destructive',
      })
    },
  })

  const { toast } = useToast()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [event.target.id]: event.target.value }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    loginMutation.mutate(formData)
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>Login with your Email account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" value={formData.password} onChange={handleChange} required />
              </div>
              <Button type="submit" className="w-full" disabled={loginMutation.isLoading}>
                {loginMutation.isLoading ? <Loader2 className="animate-spin" /> : 'Login'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
