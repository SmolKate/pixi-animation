
import { useAppDispatch, useAppSelector } from "@/assets/hooks/redux"
import { getTodos } from "@/assets/store/reducers/todoActionCreators"
import { ITodoState, deleteTodo } from "@/assets/store/reducers/todoSlice"
import { useEffect, useState } from 'react'


const TodoItem = () => {
    const todoList = useAppSelector(state => state.todoReducer)
    const dispatch = useAppDispatch()
    const [randomTodo, setRandomTodo] = useState<null | ITodoState>(null)
    const [isTodoList, setIsTodoList] = useState<boolean>(false)

    useEffect(() => {
         dispatch(getTodos())
    }, [dispatch])

    const getRandomInt = (min: number, max: number) => {
        const result = Math.floor(Math.random() * (max - min + 1))
        return result
    }

    if (todoList.length != 0 && !isTodoList) {
        setIsTodoList(true)
    } 
    
    const randomHandler = () => {
        const randomIndex = getRandomInt(0, todoList.length-1)
        const randomTodo = todoList[randomIndex]
        setRandomTodo(randomTodo)
        dispatch(deleteTodo(randomIndex))
    }
    
    useEffect(() => {
        randomHandler()
    }, [isTodoList])

    return (
        <>
        <div> 
            <div>{randomTodo?.id}</div>
            <div>{randomTodo?.title}</div>   
        </div>
        <button onClick={randomHandler}>Random</button>
        </>
    )
}

export default TodoItem

