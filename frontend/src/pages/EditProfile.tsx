import React, { useState } from 'react'
import {
  makeStyles,
  Typography,
  Button,
  TextField,
  Container,
  Box,
  IconButton,
} from '@material-ui/core'
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import { Formik, Form } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import {
  selectAllUsers,
  Profile,
  updateUserProfile,
} from '../features/userSlice'
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

interface Props extends RouteComponentProps {}

const EditProfile = ({ history, match }: any | Props) => {
  const [postImage, setPostImage] = useState<File | null>(null)
  const { id } = match.params
  const classes = useStyles()

  const users = useSelector(selectAllUsers)

  const dispatch = useDispatch()

  const singleUser: Profile = users.find(
    (user: { uid: string }) => user.uid === id
  )

  const initialValues: Profile = {
    uid: singleUser.uid,
    username: singleUser.username,
    photoUrl: singleUser.photoUrl,
    company: singleUser.company,
    position: singleUser.position,
    bio: singleUser.bio,
    url: singleUser.url,
  }

  console.log('uid', singleUser.uid)

  const onUpdateProfileClicked = async (values: Profile) => {
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
        const newValues = { ...values, image: imageUrl, uid: singleUser.uid }
        const resultAction = await dispatch(updateUserProfile(newValues))
        unwrapResult(resultAction as any)
        history.push('/feed')
      } catch (err) {
        console.error(err)
      }
    } else {
      try {
        const newValues = {
          ...values,
          image: singleUser.photoUrl,
          uid: singleUser.uid,
        }
        const resultAction = await dispatch(updateUserProfile(newValues))
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
        プロフィールを編集する
      </Typography>
      <Formik
        initialValues={initialValues}
        onSubmit={(values: Profile) => {
          onUpdateProfileClicked(values)
        }}
      >
        {({ values, handleChange }) => (
          <Form>
            <TextField
              fullWidth
              variant="outlined"
              id="outlined-basic"
              margin="normal"
              label="username"
              name="username"
              type="text"
              value={values.username}
              onChange={handleChange}
              required
            />
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
              label="company"
              name="company"
              type="text"
              value={values.company}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              variant="outlined"
              id="outlined-basic"
              margin="normal"
              label="役職"
              name="position"
              type="text"
              value={values.position}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              variant="outlined"
              id="outlined-basic"
              margin="normal"
              label="bio"
              name="bio"
              type="text"
              multiline
              rows={10}
              value={values.bio}
              onChange={handleChange}
              required
            />
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

export default EditProfile
