import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Hello from './components/Hello'
import Top from './components/Top'
import Auth from './components/Auth'

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact={true} path="/" component={Top} />
        <Route path="/hello" component={Hello} />
        <Route path="/login" component={Auth} />
        {/* Not Found */}
        <Route component={() => <Redirect to="/" />} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router
