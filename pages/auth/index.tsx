import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Auth.module.css'
import AuthForm from '@/components/AuthForm'
import { NextPage } from 'next'
import { useAppSelector } from '@/assets/hooks/redux'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAuth } from '@/assets/hooks/useAuth'
import FetchError from '@/components/FetchError'

const Auth: NextPage = () => {
  const authError = useAppSelector(state => state.authReducer.error)
  const authStatus = useAppSelector(state => state.authReducer.status)
  const canActivate = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (canActivate) {
      router.push('/todo')
    }
  }, [router, canActivate])

  return (
    <>
      <Head>
        <title>Auth</title>
        <meta name="description" content="Auth page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <AuthForm />
        <div className={styles.fetchError}>
          <FetchError error={authError} status={authStatus} />
        </div>
      </main>
    </>
  )
}

export default Auth
