import { authAPI } from '@/modules/auth/api/authApi'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'

export interface IAuthState {
  status: 'pending' | 'fulfilled' | 'rejected' | null
  error: string | null
}

const initialState: IAuthState = {
  status: null,
  error: null,
}

// Запрос авторизационных данных с сервера и сохранение их в local storage
export const getAuthUser = createAsyncThunk(
  'auth/getAuthUser',
  async function (userData: { username: string; password: string }, { rejectWithValue }) {
    try {
      const response = await authAPI.login(userData.username, userData.password)
      localStorage.setItem('userData', JSON.stringify(response))
    } catch (err: unknown | AxiosError) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.message + ': ' + err.response?.data.message)
      }
    }
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    deleteError: state => {
      state.error = null
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getAuthUser.pending, (state, action) => {
        state.status = 'pending'
        state.error = null
      })
      .addCase(getAuthUser.fulfilled, (state, action) => {
        state.status = 'fulfilled'
      })
      .addCase(getAuthUser.rejected, (state, action) => {
        state.status = 'rejected'
        state.error = action.payload as string
      })
  },
})

// Action creators are generated for each case reducer function
export const { deleteError } = authSlice.actions

export default authSlice.reducer
