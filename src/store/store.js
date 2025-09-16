import { configureStore } from '@reduxjs/toolkit'
import burgerReducer from '@/store/burgerSlice'

export const store = configureStore({
  reducer: {
    burgerMenu: burgerReducer
  },
})