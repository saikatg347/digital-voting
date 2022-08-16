import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

const API_URL = '/api/candidate/'

export const getAllCandidates = createAsyncThunk(
	'candidate/getAll',
	async (arg, {getState, rejectWithValue}) => {
    try {
      const {user} = getState()

      const config = {
        headers: {
          Authorization: `Bearer ${user.userToken}`
        }
      }

      const {data} = await axios.get(API_URL, config)

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

export const resetVotes = createAsyncThunk(
	'candidate/resetVotes',
	async (arg, {getState, rejectWithValue}) => {
    try {
      const {user} = getState()

      const config = {
        headers: {
          Authorization: `Bearer ${user.userToken}`
        }
      }

      const {data} = await axios.put(API_URL + 'reset', {}, config)

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

export const voteCandidate = createAsyncThunk(
	'candidate/vote',
	async (id, {getState, rejectWithValue}) => {
    try {
      const {user} = getState()

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.userToken}`
        }
      }
      const {data} = await axios.put(API_URL + 'vote', {id} , config)

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
