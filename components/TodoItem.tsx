import { useAppDispatch, useAppSelector } from '@/assets/hooks/redux'
import { useAuth } from '@/assets/hooks/useAuth'
import { getTodos } from '@/assets/store/reducers/todoSlice'
import { setRandomTodo } from '@/assets/store/reducers/todoSlice'
import FetchError from '@/components/FetchError'
import Picture from '@/components/Picture'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import styles from '@/styles/Todo.module.css'

const TodoItem = () => {
  const todoList = useAppSelector(state => state.todoReducer.todos)
  const randomTodo = useAppSelector(state => state.todoReducer.randomTodo)
  const todoError = useAppSelector(state => state.todoReducer.error)
  const todoStatus = useAppSelector(state => state.todoReducer.status)

  const dispatch = useAppDispatch()
  const canActivate = useAuth()
  const router = useRouter()

  const [isAvailable, setIsAvailable] = useState(false)

  useEffect(() => {
    if (!canActivate) {
      router.replace('/auth')
    } else {
      if (todoList.length == 0) dispatch(getTodos())
      setIsAvailable(true)
    }
  }, [canActivate, router, dispatch, todoList.length])

  const getRandomInt = (min: number, max: number) => {
    const result = Math.floor(Math.random() * (max - min + 1))
    return result
  }

  const randomHandler = () => {
    const randomIndex = getRandomInt(0, todoList.length - 1)
    dispatch(setRandomTodo(randomIndex))
  }

  useEffect(() => {
    if (todoList.length != 0 && !randomTodo) {
      randomHandler()
    }
  }, [todoList])

  return (
    <>
      {isAvailable && (
        <div className={styles.todoContainer}>
          <div className={styles.picture}>
            <Picture clickHandler={randomHandler} />
          </div>
          <div className={styles.todo}>{randomTodo?.title}</div>
          <div className={styles.fetchError}>
            <FetchError error={todoError} status={todoStatus} />
          </div>
        </div>
      )}
    </>
  )
}

export default TodoItem
