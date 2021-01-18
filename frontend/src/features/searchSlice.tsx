import { createSlice } from '@reduxjs/toolkit'

const initialState = [{ values: { q: '' } }]

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    searchPosts(state, action)  {
      state.push(action.payload)
    }
  }
})

export const { searchPosts } = searchSlice.actions

export default searchSlice.reducer