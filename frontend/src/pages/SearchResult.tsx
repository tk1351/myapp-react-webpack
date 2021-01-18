import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { selectAllUsers } from '../features/userSlice'
import { selectAllCategories } from '../features/categorySlice'
import { PostProps, convertPostingDateToJapanTime } from './Post'
import { Avatar } from '@material-ui/core'

const initialState = [
  {
    _id: '',
    uid: '',
    categoryId: '',
    title: '',
    text: '',
    image: '',
    url: '',
    fav: 0,
    createdAt: null,
  },
]

const SearchResult = () => {
  const [postLists, setPostLists] = useState<PostProps[]>(initialState)

  const q = useSelector((state: any) => state.queryParams).slice(-1)[0].values.q
  const users = useSelector(selectAllUsers)
  const categories = useSelector(selectAllCategories)

  useEffect(() => {
    fetchPostsDataByQueryParams()
  }, [])

  const orderdPosts = postLists
    .slice()
    .sort((a, b) =>
      convertPostingDateToJapanTime(b.createdAt).localeCompare(
        convertPostingDateToJapanTime(a.createdAt)
      )
    )

  const fetchPostsDataByQueryParams = async () => {
    const url = `/api/v1/search/posts?q=${q}`
    try {
      await axios.get(url).then((res) => {
        setPostLists(res.data)
      })
    } catch (err) {
      console.error(err)
    }
  }

  const matchCategoriesIdAndCategoriesName = (categoryId: string) => {
    return categories.find(
      (category: { _id: string }) => category._id === categoryId
    )?.name
  }

  const matchUidAndPhotoUrl = (uid: string) => {
    return users.find((user: { uid: string }) => user.uid === uid)?.photoUrl
  }
  return (
    <div>
      <h2>検索結果</h2>
      {orderdPosts.map((post: PostProps) => (
        <>
          <Avatar src={matchUidAndPhotoUrl(post.uid)} />
          <p>{convertPostingDateToJapanTime(post.createdAt)}</p>
          <h1>{post.title}</h1>
          <p>{post.text}</p>
          {post.image && <Avatar src={post.image} />}
          <p>
            カテゴリー: {matchCategoriesIdAndCategoriesName(post.categoryId)}
          </p>
        </>
      ))}
    </div>
  )
}

export default SearchResult
