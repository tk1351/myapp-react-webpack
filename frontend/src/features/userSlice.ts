import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  users: [],
  status: 'idle',
  error: null,
}

export interface Profile {
  uid: string
  username: string
  photoUrl: string
  company: string
  position: string
  bio: string
  url: string
}

export const fetchAvatars = createAsyncThunk('users/fetchAvatars', async () => {
  const url = '/api/v1/user'
  const res = await axios.get(url)
  return res.data
})

export const updateUserProfile = createAsyncThunk(
  'users/updateUserProfile',
  async (newValues: Profile) => {
    const url = `/api/v1/user/${newValues.uid}`
    const res = await axios.put(url, newValues)
    return res.data
  }
)

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (user: Profile) => {
    const url = `/api/v1/user/${user.uid}`
    const res = await axios.delete(url)
    return res.data
  }
)

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAvatars.pending as any]: (state, action) => {
      state.status = 'loading'
    },
    [fetchAvatars.fulfilled as any]: (state, action) => {
      state.status = 'suceeded'
      state.users = state.users.concat(action.payload)
    },
    [fetchAvatars.rejected as any]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [updateUserProfile.fulfilled as any]: (state: any, action) => {
      const profileData = state.users.findIndex(
        (user: { uid: string }) => user.uid === action.payload.uid
      )
      state.users.splice(profileData, 1, action.payload)
    },
    [updateUserProfile.rejected as any]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [deleteUser.fulfilled as any]: (state: any, action) => {
      const deleteUsersData = state.users.findIndex(
        (user: { _id: string }) => user._id === action.meta.arg._id
      )
      state.users.splice(deleteUsersData, 1)
    },
    [deleteUser.rejected as any]: (state: any, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
  },
})

export const selectAllUsers = (state: any) => state.userData.users

export default usersSlice.reducer
