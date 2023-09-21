// import { todoAPI } from "@/assets/api/todoApi"
// import { addTodos } from "@/assets/store/reducers/todoSlice"
// import { AppDispatch } from "@/assets/store/store"
// import axios, { AxiosError } from "axios"

// export const getTodos = () => async (dispatch: AppDispatch) => {
//     try {
//         const data = await todoAPI.getTodoList()
//         dispatch(addTodos(data))
//     } catch (err: unknown | AxiosError) {
//         if(axios.isAxiosError(err)) {
//             console.log(err.message)
//         } else {
//             console.log(err)
//         }
//     }
// }
