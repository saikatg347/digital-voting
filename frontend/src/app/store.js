import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/user/userSlice'
import  candidateReducer from '../features/candidate/candidateSlice'

export const store = configureStore({
	reducer: {
    user: userReducer,
    candidates: candidateReducer
  },
})
