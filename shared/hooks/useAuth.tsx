import { useRouter } from 'next/router'

export const useAuth = () => {
  const getItem = (key: string) => {
    if (typeof window !== 'undefined') {
      const value = localStorage.getItem(key)
      return value ? JSON.parse(value) : undefined
    }
    return undefined
  }

  const isUserAuth: string | undefined = getItem('userData')

  if (!isUserAuth) {
    return false
  }

  return true
}
