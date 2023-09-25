import { useEffect, ReactNode, useState } from 'react'
import { useAppSelector } from '@/shared/hooks/reduxHooks'
import styles from '@/shared/hoc/Loading/Loading.module.css'

// HOC для отображения процесса загрузки

const LoadingWrapper = ({ children }: { children: ReactNode }) => {
  const todoLoading = useAppSelector(state => state.todoReducer.status)
  const authLoading = useAppSelector(state => state.authReducer.status)
  const assetsLoading = useAppSelector(state => state.todoReducer.isAssetsLoading)

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (todoLoading == 'pending' || authLoading == 'pending' || assetsLoading) {
      setIsLoading(true)
    } else {
      setIsLoading(false)
    }
  }, [todoLoading, authLoading, assetsLoading])

  return (
    <div>
      {isLoading && <div className={styles.loading}>Loading...</div>}
      <div>{children}</div>
    </div>
  )
}

export default LoadingWrapper
