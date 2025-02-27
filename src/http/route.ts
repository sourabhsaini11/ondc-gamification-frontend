import { LoginFormData, RegisterFormData } from '@/types'
import axiosInstance from '../lib/axiosInstance'

export const loginAPI = async (data: LoginFormData) => {
  const response = await axiosInstance.post('/api/v1//users/login', data)
  return response.data
}

export const registerAPI = async (data: RegisterFormData) => {
  const response = await axiosInstance.post('/api/v1/users/register', data)
  return response.data
}