import TodoItem from '@/components/TodoItem'
import Head from 'next/head'
import styles from '@/styles/Todo.module.css'
import { NextPage } from 'next'

const Todo: NextPage = () => {
  return (
    <>
      <Head>
        <title>ToDo</title>
        <meta name="description" content="Get random todo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <TodoItem />
      </main>
    </>
  )
}

export default Todo
