import React from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'

interface Props extends RouteComponentProps {}

const Hello = ({ history }: Props) => {
  return (
    <div>
      <a onClick={history.goBack}>Previous Page</a>
      <Link to="/">Top</Link>
      <Link to="/page2">Page2</Link>
      <h1>Hello Page</h1>
    </div>
  )
}

export default Hello
