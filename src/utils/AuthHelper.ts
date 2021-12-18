import storage from './storage'
export const getHeaders = async () => {
  try {
    const token = storage.getToken()
    let Headers = {
      Authorization: 'Bearer ' + token
    }
    return Headers
  } catch (error) {}
}
