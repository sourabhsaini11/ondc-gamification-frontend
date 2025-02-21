import axiosInstance from '../lib/axiosInstance'
export const login = async (data : any) => {
    const response = await axiosInstance.post("/users/login", data, {
    });
    return response.data;
  };