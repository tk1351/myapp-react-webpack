import React from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { auth } from '../firebase'

interface Props extends RouteComponentProps {}

const Hello = ({ history }: Props) => {
  return (
    <div>
      <a onClick={history.goBack}>Previous Page</a>
      <Link to="/">Top</Link>
      <Link to="/page2">Page2</Link>
      <h1>Hello Page</h1>
      <button
        onClick={async () => {
          await auth.signOut()
          await history.push('/login')
        }}
      >
        Logout
      </button>
    </div>
  )
}

export default Hello
