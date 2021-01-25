import React from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { auth } from '../../firebase'

interface Props extends RouteComponentProps {}

const AdminScreen = ({ history }: Props) => {
  return (
    <div>
      <h1>管理画面</h1>
      <button
        onClick={async () => {
          await auth.signOut()
          await history.push('/login')
        }}
      >
        logout
      </button>
      <p>
        <Link to={'/admin/post'}>投稿記事管理</Link>
        <Link to={'/admin/user'}>ユーザー管理</Link>
      </p>
    </div>
  )
}

export default AdminScreen
