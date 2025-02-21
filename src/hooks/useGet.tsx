import { useQuery } from 'react-query'
import axiosInstance from 'services/axiosInstance'

const useGet = (key: string, url: string, configs?: any) => {
  const get = async () => {
    const { data } = await axiosInstance.get(url)
    return data
  }
  const defaultConfig = {
    enabled: false,
    refetchOnWindowFocus: false,
    retry: false,
    ...configs,
  }
  return useQuery(key, get, defaultConfig)
}

export default useGet
