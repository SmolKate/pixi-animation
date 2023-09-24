import axios from 'axios'

export interface ITodo {
  userId: number
  id: number
  title: string
  completed: boolean
}
const instance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/',
})

// Получение списка заданий
export const todoAPI = {
  async getTodoList() {
    const response = await instance.get<ITodo[]>('todos')
    return response.data
  },
}
