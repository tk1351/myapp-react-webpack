import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllCategories } from '../features/categorySlice'
import { selectUser } from '../features/authSlice'
import { selectAllPosts, deletePost, PostedData } from '../features/postSlice'
import { selectAllUsers } from '../features/userSlice'
import { Avatar } from '@material-ui/core'
import moment from 'moment'

export const convertPostingDateToJapanTime = (createdAt: any) => {
  moment.locale('ja')
  return moment(createdAt).format('YYYY/MM/DD')
}

export interface PostProps {
  _id: string
  uid: string
  categoryId: string
  title: string
  text: string
  image: string
  url: string
  fav: number
  createdAt: any
}

interface PostData {
  props: PostProps
}

export const initialCategoriesState = [
  {
    name: '',
    _id: '',
  },
]

const Post: React.FC<PostData> = ({ props }) => {
  const authUser = useSelector(selectUser)
  const categories = useSelector(selectAllCategories)
  const posts = useSelector(selectAllPosts)
  const users = useSelector(selectAllUsers)

  const dispatch = useDispatch()

  const matchCategoriesIdAndCategoriesName = (categoryId: string) => {
    return categories.find(
      (category: { _id: string }) => category._id === categoryId
    )?.name
  }

  const findOwnPostData = posts.find(
    (post: { uid: string }) => post.uid === authUser.uid
  )

  const onDeletePostClicked = (props: PostedData) => {
    if (window.confirm('記事を削除してもよろしいですか？')) {
      dispatch(deletePost(props))
    }
  }

  const findAuthorName = (uid: string) => {
    return users.find((user: { uid: string }) => user.uid === uid)?.username
  }

  return (
    <div>
      <p>{convertPostingDateToJapanTime(props.createdAt)}</p>
      <p>
        <Link to={`/user/profile/${props.uid}`}>
          Author: {findAuthorName(props.uid)}
        </Link>
      </p>
      <h1>{props.title}</h1>
      <p>{props.text}</p>
      {props.image && <Avatar src={props.image} />}
      <p>カテゴリー: {matchCategoriesIdAndCategoriesName(props.categoryId)}</p>
      <Link to={`/post/detail/${props._id}`}>続きを読む</Link>
      {findOwnPostData?.uid === props.uid ? (
        <>
          <button>
            <Link to={`/post/edit/${props._id}`}>編集する</Link>
          </button>
          <button onClick={() => onDeletePostClicked(props)}>削除する</button>
        </>
      ) : (
        <></>
      )}
    </div>
  )
}

export default Post
