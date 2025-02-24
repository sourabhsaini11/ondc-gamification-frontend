import axiosInstance from '../lib/axiosInstance'
export const login = async (data: any) => {
  const response = await axiosInstance.post('http://localhost:8000/api/v1/users/login', data, {})
  return response.data
}
