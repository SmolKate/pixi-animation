import { todoAPI } from "@/assets/api/todoApi"
import { addTodos } from "@/assets/store/reducers/todoSlice"
import { AppDispatch } from "@/assets/store/store"

export const getTodos = () => async (dispatch: AppDispatch) => {
    try {
        const data = await todoAPI.getTodoList()
        dispatch(addTodos(data))
    } catch (e) {
        console.log(e)
    }
}
