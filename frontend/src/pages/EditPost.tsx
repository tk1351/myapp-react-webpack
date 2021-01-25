import React, { useState, useEffect } from 'react'
import {
  Container,
  Typography,
  TextField,
  MenuItem,
  Box,
  IconButton,
  Button,
  makeStyles,
} from '@material-ui/core'
import { Formik, Form } from 'formik'
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import { useSelector, useDispatch } from 'react-redux'
import { selectAllCategories } from '../features/categorySlice'
import { Category } from '../components/Sidebar'
import { PostedData, updatePost, selectAllPosts } from '../features/postSlice'
import { unwrapResult } from '@reduxjs/toolkit'
import { storage } from '../firebase'
import { RouteComponentProps } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const initialPostState: PostedData = {
  _id: '',
  uid: '',
  title: '',
  text: '',
  categoryId: '',
  url: '',
  fav: 0,
  image: '',
  createdAt: '',
}

interface Props extends RouteComponentProps {}

const EditPost = ({ history, match }: any | Props) => {
  const { id } = match.params
  const [postImage, setPostImage] = useState<File | null>(null)
  const [singlePost, setSinglePost] = useState<PostedData>(initialPostState)
  const classes = useStyles()

  const posts = useSelector(selectAllPosts)
  const categories = useSelector(selectAllCategories)
  const postStatus = useSelector((state: any) => state.postData.status)
  const dispatch = useDispatch()

  useEffect(() => {
    setSinglePost(posts.find((post: { _id: string }) => post._id === id))
  }, [postStatus])

  const initialValues: PostedData = {
    _id: singlePost && singlePost._id,
    uid: singlePost && singlePost.uid,
    title: singlePost && singlePost.title,
    text: singlePost && singlePost.text,
    categoryId: singlePost && singlePost.categoryId,
    url: singlePost && singlePost.url,
    fav: singlePost && singlePost.fav,
    image: singlePost && singlePost.image,
    createdAt: singlePost && singlePost.createdAt,
  }

  const onUpdatePostClicked = async (values: PostedData) => {
    let imageUrl = ''

    if (postImage) {
      const str =
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
      const num = 16
      const randomChar = Array.from(
        crypto.getRandomValues(new Uint32Array(num))
      )
        .map((n) => str[n % str.length])
        .join('')
      const fileName = randomChar + '_' + postImage.name
      await storage.ref(`images/${fileName}`).put(postImage)
      imageUrl = await storage.ref('images').child(fileName).getDownloadURL()

      try {
        const newValues = { ...values, image: imageUrl }
        const resultAction = await dispatch(updatePost(newValues))
        unwrapResult(resultAction as any)
        history.push('/feed')
      } catch (err) {
        console.error(err)
      }
    } else {
      try {
        const newValues = { ...values, image: '' }
        const resultAction = await dispatch(updatePost(newValues))
        unwrapResult(resultAction as any)
        history.push('/feed')
      } catch (err) {
        console.error(err)
      }
    }
  }

  const onChangeImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files![0]) {
      setPostImage(e.target.files![0])
      e.target.value = ''
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h6">
        記事を編集する
      </Typography>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        onSubmit={(values: PostedData) => {
          onUpdatePostClicked(values)
        }}
      >
        {({ values, handleChange }) => (
          <Form>
            <TextField
              fullWidth
              variant="outlined"
              id="outlined-basic"
              margin="normal"
              label="商品名"
              name="title"
              type="text"
              value={values.title}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              variant="outlined"
              id="outlined-basic"
              margin="normal"
              label="本文"
              name="text"
              type="text"
              multiline
              rows={10}
              value={values.text}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              select
              variant="outlined"
              id="outlined-basic"
              margin="normal"
              label="カテゴリー"
              name="categoryId"
              type="text"
              value={values.categoryId}
              onChange={handleChange}
              required
            >
              {categories.map((category: Category) => (
                <MenuItem key={category.name} value={category._id}>
                  {category.name}
                </MenuItem>
              ))}
            </TextField>
            <Box>
              <IconButton
                color="primary"
                aria-label="upload image"
                component="span"
              >
                <label>
                  <PhotoCamera fontSize="large" />
                  <input type="file" onChange={onChangeImageHandler} />
                </label>
              </IconButton>
            </Box>
            <TextField
              fullWidth
              variant="outlined"
              id="outlined-basic"
              margin="normal"
              label="URL"
              name="url"
              type="text"
              value={values.url}
              onChange={handleChange}
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
              fullWidth
            >
              投稿
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  )
}

export default EditPost
