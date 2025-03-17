import { LoginFormData, RegisterFormData } from '@/types'
import axiosInstance from '../lib/axiosInstance'

export const loginAPI = async (data: LoginFormData) => {
  const response = await axiosInstance.post('/api/v1/users/login', data)
  return response.data
}

export const registerAPI = async (data: RegisterFormData) => {
  const response = await axiosInstance.post('/api/v1/users/register', data)
  return response.data
}

export const dailyLeaderboard = async () => {
  const response = await axiosInstance.get(`/api/v1/orders/daily-leaderboard`)
  return response.data.data.body
}

export const weeklyLeaderboard = async () => {
  const response = await axiosInstance.get(`/api/v1/orders/week-leaderboard`)
  return response.data.data.body
}

export const monthlyLeaderboard = async () => {
  const response = await axiosInstance.get(`/api/v1/orders/month-leaderboard`)
  return response.data.data.body
}

export const allTimeLeaders = async() => {
  const response = await axiosInstance.get(`/api/v1/orders/alltime-leaderboard`)
  return response.data.data.body
}