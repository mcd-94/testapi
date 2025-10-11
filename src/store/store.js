import { configureStore } from '@reduxjs/toolkit'
import startMenuReducer from '@/store/startMenuSlice'
import themeReducer from '@/store/themeSlice'

export const store = configureStore({
  reducer: {
    startMenu: startMenuReducer,
    theme: themeReducer, // <- ahora sí el slice del tema forma parte del store
  },
})

