import axios from 'axios'
import { toast } from 'react-toastify'
import { getHeaders } from './AuthHelper'

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

const googleapis = axios.create()

// Request parsing interceptor
googleapis.interceptors.request.use(
  async (config) => {
    const headers = await getHeaders()
    config.baseURL = 'https://www.googleapis.com'
    if (headers) config.headers
    return config
  },
  (error) => Promise.reject(error)
)

googleapis.interceptors.response.use(
  (response) => response,
  (error) => parseErrorCode(error)
)

export default googleapis
