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

// Компонента, выполняющая запрос todo заданий с сервера, отображение рандомного todo
// и его смену при клике на мяче

const TodoItem: FC = () => {

  const todoList = useAppSelector(state => state.todoReducer.todos)  // список всех заданий
  const randomTodo = useAppSelector(state => state.todoReducer.randomTodo)  // текущее задание
  const todoError = useAppSelector(state => state.todoReducer.error) // ошибка, возникшая при отправке запроса на сервер
  const todoStatus = useAppSelector(state => state.todoReducer.status) // статус выполнения запроса на сервер

  const [isAvailable, setIsAvailable] = useState(false)

  const dispatch = useAppDispatch()
  const canActivate = useAuth() // определение, прошел ли пользователь авторизацию
  const router = useRouter()

  useEffect(() => {
    if (!canActivate) {
      router.replace('/auth') // редирект, если пользователь не авторизован
    } else {
      if (todoList.length == 0) dispatch(getTodos()) // запрос списка todo
      setIsAvailable(true)
    }
  }, [canActivate, router, dispatch, todoList.length])

  // Обработчик получения рандомного задания из списка
  const randomHandler = () => {
    const randomIndex = getRandomInt(0, todoList.length - 1)
    dispatch(setRandomTodo(randomIndex))
  }
  // Определение первого рандомного задания сразу, как только был получен список
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
