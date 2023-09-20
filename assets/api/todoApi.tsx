import { ITodoState } from '@/assets/store/reducers/todoSlice';
import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/',
})

export const todoAPI = {
        async getTodoList () {
        const response = await instance.get<ITodoState[]>('todos');
            return response.data;
        },
}