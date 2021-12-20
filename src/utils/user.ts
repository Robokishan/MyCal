import { toast } from 'react-toastify'
import { COLORS, LOCAL_STORAGE_USERS_KEY } from './constants'
import { MessageType, Providers, User } from './types'

export const getUsers = (): User[] => {
  let users = [] as User[]
  try {
    users = JSON.parse(localStorage.getItem(LOCAL_STORAGE_USERS_KEY) || '')
  } catch (error) {
    toast.error('Users not found')
  }
  return users
}

export const saveUser = (user: User): MessageType => {
  const users = getUsers()
  if (
    users.filter(
      (_user) => _user.userId == user.userId && _user.type == user.type
    ).length > 0
  )
    return { success: false, message: 'User exist' }

  users.push(user)
  localStorage.setItem(LOCAL_STORAGE_USERS_KEY, JSON.stringify(users))
  return { success: true, message: 'User Saved' }
}

export const saveUsers = (users: User[]) => {
  localStorage.setItem(LOCAL_STORAGE_USERS_KEY, JSON.stringify(users))
}

export const removeuser = (id: number) => {
  const users = getUsers()
  if (id > -1) {
    users.splice(id, 1)
  }
  saveUsers(users)
  return users
}

export const upsertUser = (user: User): MessageType => {
  const users = getUsers()
  let success = false
  const i = users.findIndex(
    (_user) => _user.type === user.type && _user.userId === user.userId
  )
  if (i > -1) {
    users[i] = user
    success = false
  } else {
    users.push(user)
    success = true
  }

  saveUsers(users)
  return { success, message: success ? 'User Added' : 'User Updated' }
}

export const getColor = (email: string, type: Providers) => {
  //heavy task since reading from localstorage too often
  const users = getUsers()
  const index = users.findIndex(
    (_user) => _user.email === email && _user.type == type
  )
  if (index > -1) {
    return COLORS[index][0]
  } else return 'red'
}

export const getTailWindColor = (email: string, type: Providers) => {
  //heavy task since reading from localstorage too often
  const users = getUsers()
  const index = users.findIndex(
    (_user) => _user.email === email && _user.type == type
  )
  if (index > -1) {
    return COLORS[index][1]
  } else 'bg-red-500'
}
