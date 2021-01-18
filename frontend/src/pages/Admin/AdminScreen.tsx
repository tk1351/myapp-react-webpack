import React, { useEffect } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { auth } from '../../firebase'
import { useSelector, useDispatch } from 'react-redux'
import { fetchPostData } from '../../features/postSlice'
import { fetchAvatars } from '../../features/userSlice'
import { fetchCategoriesData } from '../../features/categorySlice'

interface Props extends RouteComponentProps {}

const AdminScreen = ({ history }: Props) => {
  const postStatus = useSelector((state: any) => state.postData.status)
  const userStatus = useSelector((state: any) => state.userData.status)
  const categoriesStatus = useSelector(
    (state: any) => state.categoriesData.status
  )

  const dispatch = useDispatch()

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPostData())
    }
    if (userStatus === 'idle') {
      dispatch(fetchAvatars())
    }
    if (categoriesStatus === 'idle') {
      dispatch(fetchCategoriesData())
    }
  }, [postStatus, userStatus, categoriesStatus, dispatch])
  return (
    <div>
      <h1>管理画面</h1>
      <button
        onClick={async () => {
          await auth.signOut()
          await history.push('/login')
        }}
      >
        logout
      </button>
      <p>
        <Link to={'/admin/post'}>投稿記事管理</Link>
        <Link to={'/admin/user'}>ユーザー管理</Link>
      </p>
    </div>
  )
}

export default AdminScreen
