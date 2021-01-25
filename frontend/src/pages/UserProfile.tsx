import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectAllUsers, Profile } from '../features/userSlice'
import {
  selectAllPosts,
  PostedData,
  deletePostWithPostArgument,
} from '../features/postSlice'
import { selectAllCategories } from '../features/categorySlice'
import { Avatar } from '@material-ui/core'
import { PostProps } from './Post'
import { Link } from 'react-router-dom'
import { selectUser } from '../features/authSlice'
import Paginations from '../components/Paginations'
import Sidebar from '../components/Sidebar'

const initialUserState: Profile = {
  uid: '',
  username: '',
  photoUrl: '',
  company: '',
  position: '',
  bio: '',
  url: '',
  role: '',
}

const initialPostsState: PostedData[] = [
  {
    _id: '',
    uid: '',
    title: '',
    text: '',
    categoryId: '',
    url: '',
    fav: 0,
    image: '',
    createdAt: '',
  },
]

const UserProfile = ({ match }: any) => {
  const { id } = match.params

  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(5)
  const [singleUser, setSingleUser] = useState<Profile>(initialUserState)
  const [usersPosts, setUsersPosts] = useState<PostedData[]>(initialPostsState)

  const users = useSelector(selectAllUsers)
  const posts = useSelector(selectAllPosts)
  const categories = useSelector(selectAllCategories)
  const authUser = useSelector(selectUser)

  const userStatus = useSelector((state: any) => state.userData.status)
  const postStatus = useSelector((state: any) => state.postData.status)

  const dispatch = useDispatch()

  const orderedPosts = usersPosts
    .slice()
    .sort((a: { createdAt: string }, b: { createdAt: string }) =>
      b.createdAt.localeCompare(a.createdAt)
    )

  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage

  const currentPosts = orderedPosts.slice(indexOfFirstPost, indexOfLastPost)
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  useEffect(() => {
    setSingleUser(users.find((user: { uid: string }) => user.uid === id))
    setUsersPosts(
      posts.filter((post: { uid: string }) => post.uid === singleUser?.uid)
    )
  }, [userStatus, postStatus, singleUser])

  const matchCategoriesIdAndCategoriesName = (categoryId: string) => {
    return categories.find(
      (category: { _id: string }) => category._id === categoryId
    )?.name
  }

  const findOwnPostData = posts.find(
    (post: { uid: string }) => post.uid === authUser.uid
  )

  const onDeletePostClicked = async (post: PostedData) => {
    if (window.confirm('記事を削除してもよろしいですか？')) {
      dispatch(deletePostWithPostArgument(post))
    }
  }

  return !singleUser ? (
    <></>
  ) : (
    <div>
      <Avatar src={singleUser.photoUrl} />
      <p>ユーザー名：{singleUser.username}</p>
      <p>所属： {singleUser.company}</p>
      <p>役職： {singleUser.position}</p>
      <p>自己紹介： {singleUser.bio}</p>
      <p>{singleUser.url}</p>
      <h1>{singleUser.username}さんの投稿記事</h1>
      {usersPosts &&
        currentPosts.map((post: PostProps) => (
          <>
            <h1>{post.title}</h1>
            <p>{post.text}</p>
            <p>
              カテゴリー： {matchCategoriesIdAndCategoriesName(post.categoryId)}
            </p>
            <Link to={`/post/detail/${post._id}`}>続きを読む</Link>
            {findOwnPostData?.uid === singleUser.uid ? (
              <>
                <button>
                  <Link to={`/post/edit/${post._id}`}>編集する</Link>
                </button>
                <button onClick={() => onDeletePostClicked(post)}>
                  削除する
                </button>
              </>
            ) : (
              <></>
            )}
          </>
        ))}
      <Paginations
        postsPerPage={postsPerPage}
        totalPosts={orderedPosts.length}
        paginate={paginate}
      />
      <Sidebar />
    </div>
  )
}

export default UserProfile
