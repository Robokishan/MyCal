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

const oauth2microsoft = axios.create()

// Request parsing interceptor
oauth2microsoft.interceptors.request.use(
  async (config) => {
    config.baseURL = 'https://login.microsoftonline.com/common/'
    // /common/oauth2/v2.0/authorize?client_id=de8bc8b5-d9f9-48b1-a8ad-b748da725064&scope=openid%20profile%20User.Read%20offline_access&redirect_uri=https%3A%2F%2Fdeveloper.microsoft.com%2Fen-us%2Fgraph%2Fgraph-explorer&client-request-id=4045ad2e-5664-4ffb-98a6-f2f85346f778&response_mode=fragment&response_type=code&x-client-SKU=msal.js.browser&x-client-VER=2.19.0&x-client-OS=&x-client-CPU=&client_info=1&code_challenge=ru7BITtEYbX4bcVdlJciATR8QxsX06jpWuKz4e2NxQI&code_challenge_method=S256&prompt=select_account&nonce=b6a49c57-deb0-4584-be3d-b0849f6764d5&state=eyJpZCI6Ijc0OTkzZTY3LTZhYzMtNDZhZi05MDMxLTdjMzZkZjdlMDAzOSIsIm1ldGEiOnsiaW50ZXJhY3Rpb25UeXBlIjoicG9wdXAifX0%3D&mkt=en-US
    return config
  },
  (error) => Promise.reject(error)
)

oauth2microsoft.interceptors.response.use(
  (response) => response,
  (error) => parseErrorCode(error)
)

export default oauth2microsoft
