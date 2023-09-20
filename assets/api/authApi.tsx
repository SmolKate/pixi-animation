import axios from 'axios';
interface ILoginResponse {
    id: number
    username: string
    email: string
    firstName: string
    lastName: string
    gender: string
    image: string
    token: string
  }
const instance = axios.create({
    baseURL: 'https://dummyjson.com/auth/',
    headers: { 'Content-Type': 'application/json' },
})

export const authAPI = {
    async login (username: string, password: string) {
        const response = await instance.post<ILoginResponse>('login', { username, password});
        return response.data;
    },

}