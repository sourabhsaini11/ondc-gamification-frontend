import { useMutation } from 'react-query'
import axiosInstance from 'services/axiosInstance'

interface IParams {
  url: string
  payload?: any
}

const post = async ({ url, payload }: IParams) => {
  const { data } = await axiosInstance.post(url, payload)
  return data
}

const usePost = () => useMutation(post)

export default usePost
