import { configureStore } from '@reduxjs/toolkit'
import feedSlice from './feedSlice'
import appConfigSlice from './appConfigSlice'
import userSlice from './userSlice'
export const store = configureStore({
  reducer: {
    feedSlice,
    appConfigSlice,
    userSlice
  },
})