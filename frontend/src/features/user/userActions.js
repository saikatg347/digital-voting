import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

const API_URL = '/api/user/'

export const userLogin = createAsyncThunk(
	'user/login',
	async (userData, {rejectWithValue}) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }

      const {data} = await axios.post(API_URL + 'login', userData, config)

      localStorage.setItem('userToken', data.userToken)

      return data
    } catch (err) {
      if (err.response && err.response.data.message) {
        return rejectWithValue(err.response.data.message)
      } else {
        return rejectWithValue(err.message)
      }
    }
  }
)

export const userRegister = createAsyncThunk(
	'user/register',
	async (userData, {rejectWithValue}) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }

      await axios.post(API_URL + 'register', userData, config)

    } catch (err) {
      if (err.response && err.response.data.message) {
        return rejectWithValue(err.response.data.message)
      } else {
        return rejectWithValue(err.message)
      }
    }
  }
)

export const getUserDetails = createAsyncThunk(
	'user/getUserDetails',
	async (arg, {getState, rejectWithValue}) => {
    try {
      const {user} = getState()

      const config = {
        headers: {
          Authorization: `Bearer ${user.userToken}`
        }
      }

      const {data} = await axios.get(API_URL + 'profile', config)

      return data
    } catch (err) {
      if (err.response && err.response.data.message) {
        return rejectWithValue(err.response.data.message)
      } else {
        return rejectWithValue(err.message)
      }
    }
  }
)

