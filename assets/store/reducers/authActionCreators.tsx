import { authAPI } from "@/assets/api/authApi"
import { todoAPI } from "@/assets/api/todoApi"
import { authUser } from "@/assets/store/reducers/authSlice"
import { AppDispatch } from "@/assets/store/store"
import axios, { AxiosError } from "axios"
import router from "next/router"

export const getAuthUser = (username: string, password: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await authAPI.login(username, password)
        localStorage.setItem("userData", JSON.stringify(response))
        dispatch(authUser())
        router.push('/todo')
      } catch (err: unknown | AxiosError) {
        if(axios.isAxiosError(err)) {
            console.log(err.message)
            console.log(err.response?.data.message)
        } else {
            console.log(err)
        }
      }
}
