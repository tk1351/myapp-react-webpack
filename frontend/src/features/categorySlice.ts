import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  categories: [],
  status: 'idle',
  error: null,
}

export const fetchCategoriesData = createAsyncThunk(
  'category/fetchCategoriesData',
  async () => {
    const url = '/api/v1/category'
    const res = await axios.get(url)
    return res.data
  }
)

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCategoriesData.pending as any]: (state, action) => {
      state.status = 'loading'
    },
    [fetchCategoriesData.fulfilled as any]: (state, action) => {
      state.status = 'succeeded'
      state.categories = state.categories.concat(action.payload)
    },
    [fetchCategoriesData.rejected as any]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
  },
})

export const selectAllCategories = (state: any) =>
  state.categoriesData.categories

export default categorySlice.reducer
