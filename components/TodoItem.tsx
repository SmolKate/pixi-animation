
import { useAppDispatch, useAppSelector } from "@/assets/hooks/redux"
import { getTodos } from "@/assets/store/reducers/actionCreators"
import { IITodoStatee, deleteTodo } from "@/assets/store/reducers/todoSlice"
import { useEffect, useState } from 'react'


const TodoItem = () => {

    useEffect(() => {
        dispatch(getTodos())
    }, [])

    const [randomTodo, setRandomTodo] = useState<null | IITodoStatee>(null)
    const todoList = useAppSelector(state => state.todoReducer)
    const dispatch = useAppDispatch()
 
    const getRandomInt = (min: number, max: number) => {
        const result = Math.floor(Math.random() * (max - min + 1))
        console.log(result)
        return result
    }
    const randomHandler = () => {
        const randomIndex = getRandomInt(0, todoList.length-1)
        const randomTodo = todoList[randomIndex]
        setRandomTodo(randomTodo)
        dispatch(deleteTodo(randomIndex))
    }
    
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

