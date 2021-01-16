import React from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'

interface Props extends RouteComponentProps {}

const Top = ({ match, history, location }: Props) => {
  console.log('match', match)
  console.log('history', history)
  console.log('location', location)
  return (
    <div>
      <h1>MyApp</h1>
      <Link to="/hello">Hello</Link>
      <Link to="/login">Login</Link>
    </div>
  )
}

export default Top
