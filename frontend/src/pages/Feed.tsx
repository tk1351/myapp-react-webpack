import React, { useEffect, useState } from 'react'
import { auth } from '../firebase'
import { selectUser } from '../features/authSlice'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { Avatar } from '@material-ui/core'
import { fetchPostData, selectAllPosts } from '../features/postSlice'
import { fetchAvatars, selectAllUsers } from '../features/userSlice'
import { fetchCategoriesData } from '../features/categorySlice'
import { fetchCommentsData } from '../features/commentSlice'
import Post, { PostProps } from './Post'
import Paginations from '../components/Paginations'
import Sidebar from '../components/Sidebar'
import AuthState from '../components/AuthState'

const Feed = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(5)

  const user = useSelector(selectUser)
  const posts = useSelector(selectAllPosts)
  const users = useSelector(selectAllUsers)
  const postStatus = useSelector((state: any) => state.postData.status)
  const userStatus = useSelector((state: any) => state.userData.status)
  const categoriesStatus = useSelector(
    (state: any) => state.categoriesData.status
  )
  const commentsStatus = useSelector((state: any) => state.commentData.status)

  const dispatch = useDispatch()

  const orderedPosts = posts
    .slice()
    .sort((a: { createdAt: string }, b: { createdAt: string }) =>
      b.createdAt.localeCompare(a.createdAt)
    )

  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage

  const currentPosts = orderedPosts.slice(indexOfFirstPost, indexOfLastPost)
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  const loginUserState = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const addUserInfo = async () => {
          const url = '/api/v1/user'
          try {
            await axios.post(url, {
              uid: user.uid,
              username: user.displayName,
              photoUrl: user.photoURL,
              role: 'user',
            })
          } catch (err) {
            console.error(err)
          }
        }
        addUserInfo()
      } else {
        console.log('未ログイン')
      }
    })
  }

  useEffect(() => {
    loginUserState()
    fetchAvatars()
    // if (postStatus === 'idle') {
    //   dispatch(fetchPostData())
    // }
    // if (userStatus === 'idle') {
    //   dispatch(fetchAvatars())
    // }
    // if (categoriesStatus === 'idle') {
    //   dispatch(fetchCategoriesData())
    // }
    // if (commentsStatus === 'idle') {
    //   dispatch(fetchCommentsData())
    // }
  }, [user, postStatus, userStatus, categoriesStatus, commentsStatus, dispatch])

  // 投稿者のuidからphotoUrlを探す
  const matchUidAndPhotoUrl = (uid: string) => {
    return users.find((user: { uid: string }) => user.uid === uid)?.photoUrl
  }

  return (
    <AuthState>
      {currentPosts[0]?._id && (
        <>
          {currentPosts?.map((post: PostProps) => (
            <>
              <Avatar src={matchUidAndPhotoUrl(post.uid)} />
              <Post key={post._id} props={post} />
            </>
          ))}
        </>
      )}
      <Paginations
        postsPerPage={postsPerPage}
        totalPosts={orderedPosts.length}
        paginate={paginate}
      />
      <Sidebar />
    </AuthState>
  )
}

export default Feed
