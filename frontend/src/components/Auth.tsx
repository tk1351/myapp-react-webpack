import React from 'react'
import { RouteComponentProps } from 'react-router-dom'

interface Props extends RouteComponentProps {}

const Auth = ({ history }: Props) => {
  return (
    <div>
      <form>aaa</form>
      <a onClick={history.goBack}>Previous Page</a>
    </div>
  )
}

export default Auth
