import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectAllPosts } from '../../features/postSlice'
import Paginations from '../../components/Paginations'
import { PostProps, convertPostingDateToJapanTime } from '../Post'
import { Link } from 'react-router-dom'

const AdminPostsList = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(5)

  const posts = useSelector(selectAllPosts)

  const orderedPosts = posts
    .slice()
    .sort((a: { createdAt: any }, b: { createdAt: any }) =>
      convertPostingDateToJapanTime(b.createdAt).localeCompare(
        convertPostingDateToJapanTime(a.createdAt)
      )
    )

  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage

  const currentPosts = orderedPosts.slice(indexOfFirstPost, indexOfLastPost)
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <div>
      <h1>投稿記事管理画面</h1>
      {currentPosts[0]?._id && (
        <>
          {currentPosts.map((post: PostProps) => (
            <>
              <p>{convertPostingDateToJapanTime(post.createdAt)}</p>
              <h3>{post.title}</h3>
              <Link to={`/admin/post/${post._id}`}>詳細を確認する</Link>
            </>
          ))}
        </>
      )}
      <Paginations
        postsPerPage={postsPerPage}
        totalPosts={orderedPosts.length}
        paginate={paginate}
      />
    </div>
  )
}

export default AdminPostsList
