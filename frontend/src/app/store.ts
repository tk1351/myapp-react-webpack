import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import authReducer from '../features/authSlice'
import postsReducer from '../features/postSlice'
import usersReducer from '../features/userSlice'
import categoryReducer from '../features/categorySlice'
import commentReducer from '../features/commentSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    postData: postsReducer,
    userData: usersReducer,
    categoriesData: categoryReducer,
    commentData: commentReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
