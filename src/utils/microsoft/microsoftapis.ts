import axios from 'axios'
import { toast } from 'react-toastify'

const parseErrorCode = (error: any) => {
  if (error.response) {
    if (error.response.status === 401) {
      toast.error('Unauthorized!')
    } else if (error.response.status === 404) {
      toast.error('Page not found 404')
    } else {
      toast.error('Something went wrong !')
    }
  } else {
    toast.error(error.message)
  }

  return Promise.reject(error.response)
}

const microsoftapis = axios.create()

// Request parsing interceptor
microsoftapis.interceptors.request.use(
  async (config) => {
    config.baseURL = 'https://graph.microsoft.com'
    return config
  },
  (error) => Promise.reject(error)
)

microsoftapis.interceptors.response.use(
  (response) => response,
  (error) => parseErrorCode(error)
)

export default microsoftapis
