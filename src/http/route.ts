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

const getPreviousDate = () => {
  const date = new Date()
  date.setDate(date.getDate())
  return date.toISOString().split('T')[0]
}

export const dailyLeaderboard = async () => {
  const response = await axiosInstance.get(`/api/v1/orders/daily-leaderboard?date=${getPreviousDate()}`)
  return response.data.data.body
}

export const weeklyLeaderboard = async () => {
  const response = await axiosInstance.get(`/api/v1/orders/week-leaderboard?date=${getPreviousDate()}`)
  return response.data.data.body
}

export const monthlyLeaderboard = async () => {
  const response = await axiosInstance.get(`/api/v1/orders/month-leaderboard?date=${getPreviousDate()}`)
  return response.data.data.body
}

export const dailyLeaderboard2 = async () => {
  const response = await axiosInstance.get(`/api/v1/orders/daily-leaderboard2?date=${getPreviousDate()}`)
  return response.data.data.body
}

export const weeklyLeaderboard2 = async () => {
  const response = await axiosInstance.get(`/api/v1/orders/week-leaderboard2?date=${getPreviousDate()}`)
  return response.data.data.body
}

export const monthlyLeaderboard2 = async () => {
  const response = await axiosInstance.get(`/api/v1/orders/month-leaderboard2?date=${getPreviousDate()}`)
  return response.data.data.body
}

export const allTimeLeaders = async () => {
  const response = await axiosInstance.get(`/api/v1/orders/alltime-leaderboard?date=${getPreviousDate()}`)
  return response.data.data.body
}

export const fileUpload = async (formdata: any) => {
  const response = await axiosInstance.post(`/api/v1/orders/upload-csv`, formdata, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return response.data
}

export const searchGameId = async (gameId: string, filter: string) => {
  if (!gameId) return null
  const { data } = await axiosInstance.get(`/api/v1/orders/search?format=${filter}&game_id=${gameId}`)
  return data.data
}

export const searchGameId2 = async (gameId: string, filter: string) => {
  if (!gameId) return null
  const { data } = await axiosInstance.get(`/api/v1/orders/search2?format=${filter}&game_id=${gameId}`)
  return data.data
}
