
import { ITodo } from "@/assets/api/todoApi"
import { useAppDispatch, useAppSelector } from "@/assets/hooks/redux"
import { useAuth } from "@/assets/hooks/useAuth"
import { getTodos } from "@/assets/store/reducers/todoSlice"
import { setRandomTodo } from "@/assets/store/reducers/todoSlice"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from 'react'


const TodoItem = () => {
    const todoList = useAppSelector(state => state.todoReducer.todos)
    const randomTodo = useAppSelector(state => state.todoReducer.randomTodo)
    const dispatch = useAppDispatch()
    const canActivate = useAuth()
    const router = useRouter()

    const [isAvailable, setIsAvailable] = useState(false)

    
    useEffect(() => {
      if (!canActivate) {
        router.replace('/auth')
      } else {
        if(todoList.length == 0) dispatch(getTodos())
        setIsAvailable(true)
      }
    }, [canActivate, router, dispatch, todoList.length])
  
    const getRandomInt = (min: number, max: number) => {
        const result = Math.floor(Math.random() * (max - min + 1))
        return result
    }

    
    const randomHandler = () => {
        const randomIndex = getRandomInt(0, todoList.length-1)
        dispatch(setRandomTodo(randomIndex))
    }

    useEffect(() => {
        if (todoList.length != 0 && !randomTodo) {
            randomHandler()
        }    
    }, [todoList])

 
    return (
        <>
        {isAvailable && <>
        <div> 
            <div>{randomTodo?.id}</div>
            <div>{randomTodo?.title}</div>   
        </div>
        <button onClick={randomHandler}>Random</button>
        <Link href='/auth'>Login</Link>
        </>
        }
        </>
    )
}

export default TodoItem

