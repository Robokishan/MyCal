const storage = {
  getToken: () => localStorage.getItem('token'),
  setToken: (value: string) => {
    localStorage.setItem('token', value)
  },
  saveUserId: (value: string) => {
    localStorage.setItem('userId', value)
  },
  getUserId: () => localStorage.getItem('userId'),
  removeToken: () => {
    localStorage.removeItem('token')
  },

  saveUser: (value: string) => {
    localStorage.setItem('user', JSON.stringify(value))
  },

  getUser: () => JSON.parse(localStorage.getItem('user') || '{}'),

  eraseAllvalues: () => {
    localStorage.clear()
  },

  saveUserDetails: (value: string) => {
    localStorage.setItem('details', JSON.stringify(value))
  },
  getUserDetails: () => JSON.parse(localStorage.getItem('details') || '{}')
}
export default storage
