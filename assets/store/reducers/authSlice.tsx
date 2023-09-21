import { authAPI } from '@/assets/api/authApi';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios';

export interface IAuthState {
    isAuth: boolean
    status: string | null
    error: string | null
}

const initialState: IAuthState = {
  isAuth: false,
  status: null,
  error: null,
}

export const getAuthUser = createAsyncThunk(
  "auth/getAuthUser", 
  async function (userData: {username: string, password: string}, {rejectWithValue}) {
    try {
      const response = await authAPI.login(userData.username, userData.password)
      localStorage.setItem("userData", JSON.stringify(response))
      // return response
    } catch (err: unknown | AxiosError) {
      if(axios.isAxiosError(err)) {
          return rejectWithValue(err.message + ', ' + err.response?.data.message)
      }
    }  
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authUser: (state) => {
      state.isAuth = true      
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAuthUser.pending, (state, action) => {
        state.status = 'pending'
      })
      .addCase(getAuthUser.fulfilled, (state, action) => {
        state.status = 'fulfilled'
        state.isAuth = true
      })
      .addCase(getAuthUser.rejected, (state, action) => {
        state.status = 'rejected'
        state.error = action.payload as string
      })      
  },
})

// Action creators are generated for each case reducer function
export const { authUser } = authSlice.actions

export default authSlice.reducer