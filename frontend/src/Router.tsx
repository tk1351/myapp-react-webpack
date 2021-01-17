import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Hello from './components/Hello'
import Top from './components/Top'
import Auth from './components/Auth'
import Feed from './components/Feed'
import SinglePostPage from './components/SinglePostPage'

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact={true} path="/" component={Top} />
        <Route path="/hello" component={Hello} />
        <Route path="/login" component={Auth} />
        <Route path="/feed" component={Feed} />
        <Route exact path={'/post/detail/:id'} component={SinglePostPage} />
        {/* Not Found */}
        <Route component={() => <Redirect to="/" />} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router
