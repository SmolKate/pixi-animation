import { ITodo, todoAPI } from '@/assets/api/todoApi'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'

export interface ITodoState {
  todos: ITodo[]
  randomTodo: ITodo | null
  status: string | null
  error: string | null
}

const initialState: ITodoState = {
  todos: [],
  randomTodo: null,
  status: null,
  error: null,
}

export const getTodos = createAsyncThunk('todo/getTodos', async function (_, { rejectWithValue }) {
  try {
    const response = await todoAPI.getTodoList()
    return response
  } catch (err: unknown | AxiosError) {
    if (axios.isAxiosError(err)) {
      return rejectWithValue(err.message)
    }
  }
})

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setRandomTodo: (state, action: PayloadAction<number>) => {
      if (state.todos.length != 0) {
        state.randomTodo = state.todos[action.payload]
        state.todos.splice(action.payload, 1)
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getTodos.pending, (state, action) => {
        state.status = 'pending'
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        state.status = 'fulfilled'
        if (state.todos.length == 0) {
          state.todos = action.payload as ITodo[]
        }
      })
      .addCase(getTodos.rejected, (state, action) => {
        state.status = 'rejected'
        state.error = action.payload as string
      })
  },
})

// Action creators are generated for each case reducer function
export const { setRandomTodo } = todoSlice.actions

export default todoSlice.reducer
