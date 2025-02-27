import axiosInstance from '../lib/axiosInstance'
export const login = async (data: any) => {
  const response = await axiosInstance.post('https://gamafication-node-backend-dev.thewitslab.com/api/v1/users/login', data, {})
  return response.data
}
