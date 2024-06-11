import axios  from 'axios';
import type { AxiosInstance } from 'axios';
import { getCookies } from "../../utils";

export const request : AxiosInstance = axios.create({
      baseURL: import.meta.env.VITE_BASE_URL,
      timeout: 48000,
})



request.interceptors.request.use((config) => {
      const token = getCookies("token")
      if (token) {
          config.headers["Authorization"] = `Bearer ${token}`
      }
      return config
  })
  
export default request
