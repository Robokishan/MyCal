export const getClientId = () => {
  return import.meta.env.VITE_GOOGLE_CLIENT_ID as string
}
export const getClientSecret = () => {
  return import.meta.env.VITE_GOOGLE_CLIENT_SECRET as string
}
