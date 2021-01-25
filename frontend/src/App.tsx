import React, { useEffect } from 'react'
import Routes from './Routes'
import { login, logout } from './features/authSlice'
import { auth } from './firebase'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPostData } from './features/postSlice'
import { fetchAvatars } from './features/userSlice'
import { fetchCategoriesData } from './features/categorySlice'
import { fetchCommentsData } from './features/commentSlice'

interface Props {}

const App = ({}: Props) => {
  const dispatch = useDispatch()

  const postStatus = useSelector((state: any) => state.postData.status)
  const userStatus = useSelector((state: any) => state.userData.status)
  const categoriesStatus = useSelector(
    (state: any) => state.categoriesData.status
  )
  const commentsStatus = useSelector((state: any) => state.commentData.status)

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photoUrl: authUser.photoURL,
            displayName: authUser.displayName,
          })
        )
      } else {
        dispatch(logout())
      }
    })

    if (postStatus === 'idle') {
      dispatch(fetchPostData())
    }
    if (userStatus === 'idle') {
      dispatch(fetchAvatars())
    }
    if (categoriesStatus === 'idle') {
      dispatch(fetchCategoriesData())
    }
    if (commentsStatus === 'idle') {
      dispatch(fetchCommentsData())
    }
    return () => {
      unSub()
    }
  }, [postStatus, userStatus, categoriesStatus, commentsStatus, dispatch])
  return (
    <>
      <Routes />
    </>
  )
}

export default App
