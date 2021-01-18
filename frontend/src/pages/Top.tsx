import React from 'react'
import { Link, RouteComponentProps, Router } from 'react-router-dom'

interface Props extends RouteComponentProps {}

const Top = ({ history }: Props) => {
  return (
    <div>
      <h1>あなたのビジネスに役立つICT製品がきっと見つかる!</h1>
      <div>
        <p>
          <Router history={history}>
            <Link to={'/login'}>ログイン・新規登録はこちらから</Link>
            <Link to="/hello">Hello</Link>
            <Link to="/feed">Feed</Link>
          </Router>
        </p>
        <h3>幅広い製品情報を網羅!</h3>
      </div>
    </div>
  )
}

export default Top
