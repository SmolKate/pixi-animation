import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks'
import { useAuth } from '@/shared/hooks/useAuth'
import { getTodos } from '@/modules/todo/store/todoSlice'
import { setRandomTodo } from '@/modules/todo/store/todoSlice'
import FetchError from '@/shared/components/FetchError'
import Picture from '@/modules/todo/components/Picture'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import styles from '@/modules/todo/style/Todo.module.css'
import { getRandomInt } from '@/modules/todo/utils/getRandomInt'

const TodoItem: FC = () => {

  const todoList = useAppSelector(state => state.todoReducer.todos)
  const randomTodo = useAppSelector(state => state.todoReducer.randomTodo)
  const todoError = useAppSelector(state => state.todoReducer.error)
  const todoStatus = useAppSelector(state => state.todoReducer.status)

  const [isAvailable, setIsAvailable] = useState(false)

  const dispatch = useAppDispatch()
  const canActivate = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!canActivate) {
      router.replace('/auth')
    } else {
      if (todoList.length == 0) dispatch(getTodos())
      setIsAvailable(true)
    }
  }, [canActivate, router, dispatch, todoList.length])

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
