import axios from 'axios'

const axiosInstance = axios.create({
  // baseURL: `https://gamification-node-backend-dev.thewitslab.com/`,
  baseURL:`http://localhost:8000`,

  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default axiosInstance
