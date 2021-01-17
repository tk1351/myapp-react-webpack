import React, { useEffect } from 'react'
import Router from './Router'
import { login, logout } from './features/authSlice'
import { auth } from './firebase'
import { useDispatch } from 'react-redux'

interface Props {}

const App = ({}: Props) => {
  const dispatch = useDispatch()

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
    return () => {
      unSub()
    }
  }, [dispatch])
  return <Router />
}

export default App
