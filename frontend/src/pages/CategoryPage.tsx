import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectAllPosts,
  PostedData,
  deletePostWithPostArgument,
} from '../features/postSlice'
import { selectAllCategories } from '../features/categorySlice'
import { selectAllUsers } from '../features/userSlice'
import { selectUser } from '../features/authSlice'
import { PostProps } from './Post'
import { Link } from 'react-router-dom'
import { Avatar } from '@material-ui/core'
import Sidebar, { Category } from '../components/Sidebar'

const initialCategoriesState = {
  _id: '',
  name: '',
}

const CategoryPage = ({ match }: any) => {
  const { id } = match.params
  const [categoriesName, setCategoriesName] = useState<Category>(
    initialCategoriesState
  )

  const posts = useSelector(selectAllPosts)
  const categories = useSelector(selectAllCategories)
  const users = useSelector(selectAllUsers)
  const authUser = useSelector(selectUser)

  const dispatch = useDispatch()

  const categoriesStatus = useSelector(
    (state: any) => state.categoriesData.status
  )

  useEffect(() => {
    setCategoriesName(
      categories.find((category: { _id: string }) => category._id === id)
    )
  }, [categoriesStatus, id])

  const categoriesPosts = posts.filter(
    (categoriesPost: { categoryId: string }) => categoriesPost.categoryId === id
  )

  const orderedPosts = categoriesPosts
    .slice()
    .sort((a: { createdAt: string }, b: { createdAt: string }) =>
      b.createdAt.localeCompare(a.createdAt)
    )

  const matchCategoriesIdAndCategoriesName = (categoryId: string) => {
    return categories.find(
      (category: { _id: string }) => category._id === categoryId
    )?.name
  }

  const findAuthorName = (uid: string) => {
    return users.find((user: { uid: string }) => user.uid === uid)?.username
  }

  const matchUidAndPhotoUrl = (uid: string) => {
    return users.find((user: { uid: string }) => user.uid === uid)?.photoUrl
  }

  const findOwnPostData = posts.find(
    (post: { uid: string }) => post.uid === authUser.uid
  )

  const onDeletePostClicked = async (post: PostedData) => {
    if (window.confirm('記事を削除してもよろしいですか？')) {
      dispatch(deletePostWithPostArgument(post))
    }
  }

  return (
    <div>
      <h1>{categoriesName && categoriesName.name}</h1>
      {orderedPosts[0]?._id && (
        <>
          {orderedPosts?.map((post: PostProps) => (
            <>
              <Avatar src={matchUidAndPhotoUrl(post.uid)} />
              <p>
                <Link to={`/user/profile/${post.uid}`}>
                  Author: {findAuthorName(post.uid)}
                </Link>
              </p>
              <h1>{post.title}</h1>
              <p>{post.text}</p>
              <p>
                カテゴリー：{' '}
                {matchCategoriesIdAndCategoriesName(post.categoryId)}
              </p>
              <Link to={`/post/detail/${post._id}`}>続きを読む</Link>
              {findOwnPostData?.uid === post.uid ? (
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
        </>
      )}
      <Sidebar />
    </div>
  )
}

export default CategoryPage
