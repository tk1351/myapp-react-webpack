import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectAllPosts,
  PostedData,
  deletePostWithSinglePostArgument,
} from '../../features/postSlice'
import { selectAllUsers } from '../../features/userSlice'
import { selectAllCategories } from '../../features/categorySlice'
import { Avatar } from '@material-ui/core'
import { RouteComponentProps } from 'react-router-dom'
import { convertPostingDateToJapanTime } from '../Post'

interface Props extends RouteComponentProps {}

const AdminPostDetail = ({ match, history }: any | Props) => {
  const { id } = match.params

  const posts = useSelector(selectAllPosts)
  const categories = useSelector(selectAllCategories)
  const users = useSelector(selectAllUsers)

  const dispatch = useDispatch()

  const singlePost: PostedData = posts.find(
    (post: { _id: string }) => post._id === id
  )

  const matchCategoriesIdAndCategoriesName = (categoryId: string) => {
    return categories.find(
      (category: { _id: string }) => category._id === categoryId
    )?.name
  }

  const findAuthorName = (uid: string) => {
    return users.find((user: { uid: string }) => user.uid === uid)?.username
  }

  const onDeletePostClicked = async (singlePost: PostedData) => {
    if (window.confirm('記事を削除してよろしいですか？')) {
      dispatch(deletePostWithSinglePostArgument(singlePost))
      history.push('/admin/post')
    }
  }

  return (
    <div>
      <h1>記事詳細</h1>
      <p>{convertPostingDateToJapanTime(singlePost.createdAt)}</p>
      <p>Author: {findAuthorName(singlePost.uid)}</p>
      <h1>{singlePost.title}</h1>
      <p>{singlePost.text}</p>
      {singlePost.image && <Avatar src={singlePost.image} />}
      <p>
        カテゴリー： {matchCategoriesIdAndCategoriesName(singlePost.categoryId)}
      </p>
      <button onClick={() => onDeletePostClicked(singlePost)}>削除</button>
    </div>
  )
}

export default AdminPostDetail
