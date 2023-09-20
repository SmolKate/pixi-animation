import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import TodoItem from '@/components/TodoItem'
import AuthForm from '@/components/AuthForm'
import { authAPI } from '@/assets/api/authApi'
import { useRouter } from 'next/router'
import { NextPage } from 'next'


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

const Home: NextPage = () => {

  const router = useRouter()

  const loginHandler = async (username: string, password: string) => {
    try {
      const response = await authAPI.login(username, password)
      localStorage.setItem("userData", JSON.stringify(response))
      router.push('/todo')
    } catch (e) {
      console.log('Some error!')
    }
  }

  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Home page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <AuthForm loginHandler={loginHandler}/>
      </main>
    </>
  )
}

export default Home