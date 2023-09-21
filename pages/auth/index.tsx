
import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import AuthForm from '@/components/AuthForm'
import { NextPage } from 'next'
import { useAppSelector } from '@/assets/hooks/redux'
import router, { useRouter } from 'next/router'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '@/assets/hooks/useAuth'

const inter = Inter({ subsets: ['latin'] })

// export const getStaticProps = async () => {
//   const todoList = await todoAPI.getTodoList()

//   return {
//       props: {
//         todoList
//       }
//   }
// }

// type PropsType = {
//   todoList: ITodoState[]
// }

const Auth: NextPage = () => {

  const isAuth = useAppSelector(state => state.authReducer.isAuth)
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
      <main className={`${styles.main} ${inter.className}`}>
        <AuthForm />
        <Link href='/todo'>Login</Link>
      </main>
    </>
  )
}

export default Auth