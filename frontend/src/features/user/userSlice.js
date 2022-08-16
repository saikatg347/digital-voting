import { createSlice } from '@reduxjs/toolkit'
import { userLogin, userRegister, getUserDetails } from './userActions'

const userToken = localStorage.getItem('userToken')
	? localStorage.getItem('userToken')
	: null

const initialState = {
  loading: false,
  userInfo: null,
  userToken,
  error: null,
  success: false
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('userToken')
      state.loading = false
      state.userInfo = null
      state.userToken = null
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(userLogin.fulfilled, (state, {payload}) => {
        state.loading = false
        state.userInfo = payload
        state.userToken = payload.userToken
      })
      .addCase(userLogin.rejected, (state, {payload}) => {
        state.loading = false
        state.error = payload
      })
      .addCase(userRegister.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(userRegister.fulfilled, (state, {payload}) => {
        state.loading = false
        state.success = true
      })
      .addCase(userRegister.rejected, (state, {payload}) => {
        state.loading = false
        state.error = payload
      })
      .addCase(getUserDetails.pending, (state) => {
        state.loading = true
      })
      .addCase(getUserDetails.fulfilled, (state, {payload}) => {
        state.loading = false
        state.userInfo = payload
      })
      .addCase(getUserDetails.rejected, (state, {payload}) => {
        state.loading = false
      })
  }
})

export const {logout} = userSlice.actions
export default userSlice.reducer