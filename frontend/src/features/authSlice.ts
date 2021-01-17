import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../app/store'

interface User {
  displayName: string
  photoUrl: string
  role: string
}

const initialState = {
  user: {
    uid: '',
    photoUrl: '',
    displayName: '',
    role: '',
  },
}

export const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload
    },
    logout: (state) => {
      state.user = { uid: '', photoUrl: '', displayName: '', role: '' }
    },
    updateUserProfile: (state, action: PayloadAction<User>) => {
      state.user.displayName = action.payload.displayName
      state.user.photoUrl = action.payload.photoUrl
      state.user.role = action.payload.role
    },
  },
})

export const { login, logout, updateUserProfile } = authSlice.actions

export const selectUser = (state: RootState) => state.auth.user

export default authSlice.reducer
