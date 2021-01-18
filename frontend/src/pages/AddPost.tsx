import React, { useState, useEffect } from 'react'
import {
  makeStyles,
  Typography,
  Button,
  TextField,
  MenuItem,
  Container,
  Box,
  IconButton,
} from '@material-ui/core'
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import { Formik, Form } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from '../features/authSlice'
import { storage } from '../firebase'
import {
  fetchCategoriesData,
  selectAllCategories,
} from '../features/categorySlice'
import { addNewPost } from '../features/postSlice'
import { unwrapResult } from '@reduxjs/toolkit'
import { Category } from '../components/Sidebar'
import AuthState from '../components/AuthState'
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

export interface values {
  title: string
  text: string
  categoryId: string
  url: string
  uid: string
  fav: number
}

interface Props extends RouteComponentProps {}

const initialValues = {
  title: '',
  text: '',
  categoryId: '',
  url: '',
  uid: '',
  fav: 0,
  _id: '',
  createdAt: null,
}

const AddPost = ({ history }: Props) => {
  const classes = useStyles()
  const [postImage, setPostImage] = useState<File | null>(null)

  const user = useSelector(selectUser)
  const categories = useSelector(selectAllCategories)

  const categoriesStatus = useSelector(
    (state: any) => state.categoriesData.status
  )

  const dispatch = useDispatch()

  useEffect(() => {
    if (categoriesStatus === 'idle') {
      dispatch(fetchCategoriesData())
    }
  }, [categoriesStatus, dispatch])

  const onSavePostClicked = async (values: values) => {
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
        const newValues = { ...values, uid: user.uid, fav: 0, image: imageUrl }
        const resultAction = await dispatch(addNewPost(newValues))
        unwrapResult(resultAction as any)
        history.push('/feed')
      } catch (err) {
        console.error(err)
      }
    } else {
      // 画像がない場合
      try {
        const newValues = { ...values, uid: user.uid, fav: 0 }
        const resultAction = await dispatch(addNewPost(newValues))
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
    <AuthState>
      <Container component="main" maxWidth="xs">
        <Typography component="h1" variant="h6">
          記事を投稿する
        </Typography>
        <Formik
          initialValues={initialValues}
          onSubmit={(values: values) => {
            onSavePostClicked(values)
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
    </AuthState>
  )
}

export default AddPost
