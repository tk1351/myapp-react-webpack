import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import Hello from './pages/Hello'
import Top from './pages/Top'
import Auth from './pages/Auth'
import Feed from './pages/Feed'
import SinglePostPage from './pages/SinglePostPage'
import Navbar from './components/Navbar'
import UserProfile from './pages/UserProfile'
import EditProfile from './pages/EditProfile'
import AddPost from './pages/AddPost'
import EditPost from './pages/EditPost'
import { CategoryPage } from './pages/CategoryPage'
import AdminScreen from './pages/Admin/AdminScreen'
import AdminUsersList from './pages/Admin/AdminUsersList'
import AdminPostsList from './pages/Admin/AdminPostsList'
import AdminPostDetail from './pages/Admin/AdminPostDetail'

const Routes = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact={true} path="/" component={Top} />
        <Route path="/hello" component={Hello} />
        <Route path="/login" component={Auth} />
        <Route path="/feed" component={Feed} />
        <Route exact path={'/post/detail/:id'} component={SinglePostPage} />
        <Route exact path="/user/profile/:id" component={UserProfile} />
        <Route exact path="/user/edit/:id" component={EditProfile} />
        <Route exact path="/add" component={AddPost} />
        <Route exact path="/post/edit/:id" component={EditPost} />
        <Route exact path="/category/:id" component={CategoryPage} />
        <Route exact path="/admin" component={AdminScreen} />
        <Route exact path="/admin/user" component={AdminUsersList} />
        <Route exact path="/admin/post" component={AdminPostsList} />
        <Route exact path="/admin/post/:id" component={AdminPostDetail} />
        {/* Not Found */}
        <Route component={() => <Redirect to="/" />} />
      </Switch>
    </Router>
  )
}

export default Routes
