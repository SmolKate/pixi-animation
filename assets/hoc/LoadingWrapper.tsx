import { useEffect, ReactNode, useState } from 'react'

import { useRouter } from 'next/router'
import { useAuth } from '@/assets/hooks/useAuth'
import { useAppSelector } from '@/assets/hooks/redux'

const LoadingWrapper = ({ children }: { children: ReactNode }) => {

  const todoLoading = useAppSelector(state => state.todoReducer.status)
  const authLoading = useAppSelector(state => state.authReducer.status)

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if(todoLoading == 'pending' || authLoading == 'pending') {
      setIsLoading(true)
    } else {
      setIsLoading(false)
    }
  }, [todoLoading, authLoading])
  
  return (
    <div>
      {isLoading && <div>Loading...</div>}
      <div>{children}</div>

    </div>
  )
}

export default LoadingWrapper
