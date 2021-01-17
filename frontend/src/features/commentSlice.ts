import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  comments: [],
  status: 'idle',
  error: null,
}

export interface Value {
  uid: string
  photoUrl: string
  text: string
  postId: string
}

export const fetchCommentsData = createAsyncThunk(
  'comments/fetchCommentsData',
  async () => {
    const url = '/api/v1/comment'
    const res = await axios.get(url)
    return res.data
  }
)

export const addNewComment = createAsyncThunk(
  'comments/addNewComment',
  async (newValues: Value) => {
    const url = '/api/v1/comment'
    const res = await axios.post(url, newValues)
    return res.data
  }
)

export const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCommentsData.pending as any]: (state, action) => {
      state.status = 'loading'
    },
    [fetchCommentsData.fulfilled as any]: (state, action) => {
      state.status = 'succeeded'
      state.comments = state.comments.concat(action.payload)
    },
    [fetchCommentsData.rejected as any]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [addNewComment.fulfilled as any]: (state: any, action) => {
      state.comments.push(action.payload)
    },
    [addNewComment.rejected as any]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
  },
})

export const selectAllComments = (state: any) => state.commentData.comments

export default commentSlice.reducer
