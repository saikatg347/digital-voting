import { createSlice } from '@reduxjs/toolkit'
import { getAllCandidates, voteCandidate, resetVotes  } from './candidateActions'

const userToken = localStorage.getItem('userToken')
	? localStorage.getItem('userToken')
	: null

const initialState = {
  candidates: [],
  loading: false,
  error: null,
  success: false
}

const candidateSlice = createSlice({
  name: 'candidate',
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCandidates.pending, (state) => {
        state.loading = true
      })
      .addCase(getAllCandidates.fulfilled, (state, {payload}) => {
        state.loading = false
        state.candidates = payload
      })
      .addCase(getAllCandidates.rejected, (state, {payload}) => {
        state.loading = false
        state.error = payload
      })
      .addCase(voteCandidate.pending, (state) => {
        state.loading = true
      })
      .addCase(voteCandidate.fulfilled, (state, {payload}) => {
        state.loading = false
        state.candidates = payload
      })
      .addCase(voteCandidate.rejected, (state, {payload}) => {
        state.loading = false
        state.error = payload
      })
      .addCase(resetVotes.pending, (state) => {
        state.loading = true
      })
      .addCase(resetVotes.fulfilled, (state, {payload}) => {
        state.loading = false
        state.candidates = payload
      })
      .addCase(resetVotes.rejected, (state, {payload}) => {
        state.loading = false
        state.error = payload
      })
  }
})

export const {reset} = candidateSlice.actions
export default candidateSlice.reducer