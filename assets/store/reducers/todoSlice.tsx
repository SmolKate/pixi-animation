import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ITodoState {
    userId: number
    id: number
    title: string
    completed: boolean
}

const initialState: ITodoState[] = []

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodos: (state, action: PayloadAction<ITodoState[]>) => {
      if(state.length == 0) {
        action.payload.forEach( i => state.push(i))
      }
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.splice(action.payload, 1)
    }
  },
})

// Action creators are generated for each case reducer function
export const { addTodos, deleteTodo } = todoSlice.actions

export default todoSlice.reducer