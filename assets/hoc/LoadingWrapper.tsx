import { useEffect, ReactNode, useState } from 'react'
import { useAppSelector } from '@/assets/hooks/redux'
import styles from '@/assets/hoc/Loading.module.css'

const LoadingWrapper = ({ children }: { children: ReactNode }) => {
  const todoLoading = useAppSelector(state => state.todoReducer.status)
  const authLoading = useAppSelector(state => state.authReducer.status)

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (todoLoading == 'pending' || authLoading == 'pending') {
      setIsLoading(true)
    } else {
      setIsLoading(false)
    }
  }, [todoLoading, authLoading])

  return (
    <div>
      {isLoading && <div className={styles.loading}>Loading...</div>}
      <div>{children}</div>
    </div>
  )
}

export default LoadingWrapper
