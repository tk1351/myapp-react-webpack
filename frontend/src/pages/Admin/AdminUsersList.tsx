import React from 'react'
import { selectAllUsers, Profile, deleteUser } from '../../features/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUsersPost } from '../../features/postSlice'

const AdminUsersList = () => {
  const users = useSelector(selectAllUsers)
  const dispatch = useDispatch()

  const adminUsers = users.filter(
    (user: { role: string }) => user.role === 'user'
  )

  console.log(adminUsers)

  const onDeleteUserClicked = async (user: Profile) => {
    if (window.confirm('ユーザーを削除してもよろしいですか？')) {
      await dispatch(deleteUser(user))
      await dispatch(deleteUsersPost(user))
    }
  }

  return (
    <div>
      <h1>ユーザー管理画面</h1>
      {adminUsers && (
        <>
          {adminUsers.map((user: Profile) => (
            <li key={user.uid}>
              <ul>{user.username}</ul>
              <button onClick={() => onDeleteUserClicked(user)}>削除</button>
            </li>
          ))}
        </>
      )}
    </div>
  )
}

export default AdminUsersList
