import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectAllPosts,
  PostedData,
  deletePostWithSinglePostArgument,
} from '../features/postSlice'
import {
  selectAllCategories,
  fetchCategoriesData,
} from '../features/categorySlice'
import { selectAllUsers, fetchAvatars } from '../features/userSlice'
import { Avatar, TextField, Button } from '@material-ui/core'
import MessageIcon from '@material-ui/icons/Message'
import SendIcon from '@material-ui/icons/Send'
import { selectAllComments, addNewComment } from '../features/commentSlice'
import { Formik, Form } from 'formik'
import { selectUser } from '../features/authSlice'
import { unwrapResult } from '@reduxjs/toolkit'
import { Link, RouteComponentProps } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import { convertPostingDateToJapanTime } from './Post'

interface Comment {
  _id: string
  uid: string
  photoUrl: string
  text: string
  createdAt: any
}

const initialValues = {
  _id: '',
  uid: '',
  photoUrl: '',
  text: '',
  createdAt: null,
}

interface Props extends RouteComponentProps {}

const SinglePostPage = ({ match, history }: any | Props) => {
  const { id } = match.params

  const [openComments, setOpenComments] = useState(false)

  const posts = useSelector(selectAllPosts)
  const categories = useSelector(selectAllCategories)
  const users = useSelector(selectAllUsers)
  const comments = useSelector(selectAllComments)
  const authUser = useSelector(selectUser)

  const dispatch = useDispatch()

  const singlePost = posts.find((post: { _id: string }) => post._id === id)

  const userStatus = useSelector((state: any) => state.userData.status)
  const categoriesStatus = useSelector(
    (state: any) => state.categoriesData.status
  )

  useEffect(() => {
    if (categoriesStatus === 'idle') {
      dispatch(fetchCategoriesData())
    }
    if (userStatus === 'idle') {
      dispatch(fetchAvatars())
    }
  }, [categoriesStatus, userStatus, dispatch])

  const matchCategoriesIdAndCategoriesName = (categoryId: string) => {
    return categories.find(
      (category: { _id: string }) => category._id === categoryId
    )?.name
  }

  const fetchAuthorData = users.find(
    (user: { uid: string }) => user.uid === singlePost.uid
  )

  const commentsOnThisPost = comments.filter(
    (comment: { postId: string }) => comment.postId === singlePost._id
  )

  // コメントした人のuidから名前を特定する
  const matchUidAndUsername = (uid: string) => {
    return users.find((user: { uid: string }) => user.uid === uid)?.username
  }

  const onSaveCommentClicked = async (values: Comment) => {
    try {
      const newValues = {
        ...values,
        photoUrl: authUser.photoUrl,
        uid: authUser.uid,
        postId: singlePost._id,
      }
      const resultAction = await dispatch(addNewComment(newValues))
      unwrapResult(resultAction as any)
    } catch (err) {
      console.error(err)
    }
  }

  const findOwnPostData = posts.find(
    (post: { uid: string }) => post.uid === authUser.uid
  )

  const onDeletePostClicked = async (singlePost: PostedData) => {
    if (window.confirm('記事を削除してもよろしいですか？')) {
      dispatch(deletePostWithSinglePostArgument(singlePost))
      history.push('/feed')
    }
  }

  const findAuthorName = (uid: string) => {
    return users.find((user: { uid: string }) => user.uid === uid)?.username
  }

  return (
    <div>
      <p>{convertPostingDateToJapanTime(singlePost.createdAt)}</p>
      <Avatar src={fetchAuthorData.photoUrl} />
      <p>
        <Link to={`/user/profile/${singlePost.uid}`}>
          Author: {findAuthorName(singlePost.uid)}
        </Link>
      </p>
      <h1>{singlePost.title}</h1>
      <p>{singlePost.text}</p>
      {singlePost.image && <Avatar src={singlePost.image} />}
      <p>
        カテゴリー： {matchCategoriesIdAndCategoriesName(singlePost.categoryId)}
      </p>
      {findOwnPostData?.uid === singlePost.uid ? (
        <>
          <button>
            <Link to={`/post/edit/${singlePost._id}`}>編集する</Link>
          </button>
          <button onClick={() => onDeletePostClicked(singlePost)}>
            削除する
          </button>
        </>
      ) : (
        <></>
      )}
      <MessageIcon onClick={() => setOpenComments(!openComments)} />
      {openComments && (
        <>
          {commentsOnThisPost.map((com: Comment) => (
            <div key={com._id}>
              <Avatar src={com.photoUrl} />
              <span>@{matchUidAndUsername(com.uid)}</span>
              <span>{com.text}</span>
            </div>
          ))}
          <Formik
            initialValues={initialValues}
            onSubmit={(values: Comment) => {
              onSaveCommentClicked(values)
            }}
          >
            {({ values, handleChange }) => (
              <>
                <Form>
                  <TextField
                    variant="outlined"
                    id="outlined-basic"
                    label="コメント"
                    name="text"
                    type="text"
                    value={values.text}
                    onChange={handleChange}
                    required
                  />
                </Form>
                <Button type="submit">
                  <SendIcon />
                </Button>
              </>
            )}
          </Formik>
        </>
      )}
      <Sidebar />
    </div>
  )
}

export default SinglePostPage
