import { toast } from 'react-toastify'
import { LOCAL_STORAGE_USERS_KEY } from './constants'
import { User } from './types'

export const getUsers = (): User[] => {
  let users = [] as User[]
  try {
    users = JSON.parse(localStorage.getItem(LOCAL_STORAGE_USERS_KEY) || '')
  } catch (error) {
    toast.error('Users not found')
  }
  return users
}

export const saveUser = (user: User) => {
  let users = getUsers()
  users.push(user)
  localStorage.setItem(LOCAL_STORAGE_USERS_KEY, JSON.stringify(users))
}

export const saveUsers = (user: User[]) => {
  localStorage.setItem(LOCAL_STORAGE_USERS_KEY, JSON.stringify(users))
}

export const removeuser = (id: number) => {
  let users = getUsers()
  if (id > -1) {
    users.splice(id, 1)
  }
  saveUsers(users)
}
