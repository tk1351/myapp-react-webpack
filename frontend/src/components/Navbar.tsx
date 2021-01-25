import React, { useState, useEffect } from 'react'
import { Link, RouteComponentProps, withRouter } from 'react-router-dom'
import { auth } from '../firebase'
import {
  makeStyles,
  Theme,
  createStyles,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import Search from './Search'
import { selectUser } from '../features/authSlice'
import { useSelector } from 'react-redux'
import { selectAllUsers, Profile } from '../features/userSlice'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
  })
)

const initialUserState = {
  uid: '',
  username: '',
  photoUrl: '',
  company: '',
  position: '',
  bio: '',
  url: '',
  role: '',
}

interface Props extends RouteComponentProps {}

const Navbar = ({ history }: Props) => {
  const classes = useStyles()
  const [authUserRole, setAuthUserRole] = useState<Profile>(initialUserState)

  const authUser = useSelector(selectUser)
  const users = useSelector(selectAllUsers)

  useEffect(() => {
    // loginユーザーのroleを特定
    setAuthUserRole(
      users.find((user: { uid: string }) => user.uid === authUser.uid)
    )
  }, [authUser])

  const isAuthMenuList = [
    { key: '1', path: '/feed', name: 'Feed' },
    { key: '2', path: '/add', name: '投稿' },
    { key: '3', path: `/user/edit/${authUser.uid}`, name: 'プロフィール変更' },
  ]

  const isNotAuthMenuList = [{ key: '1', path: '/login', name: 'ログイン' }]

  const adminMenuList = [{ key: '1', path: '/admin', name: '管理画面' }]

  const menuList = () => {
    if (authUserRole && authUserRole.role === 'user') {
      return (
        <>
          {isAuthMenuList.map((menu) => (
            <Link key={menu.key} to={menu.path}>
              {menu.name}
            </Link>
          ))}
          <button
            onClick={async () => {
              await auth.signOut()
              await history.push('/login')
            }}
          >
            ログアウト
          </button>
        </>
      )
    } else if (authUserRole && authUserRole.role === 'admin') {
      return adminMenuList.map((menu) => (
        <Link key={menu.key} to={menu.path}>
          {menu.name}
        </Link>
      ))
    }
    return isNotAuthMenuList.map((menu) => (
      <Link key={menu.key} to={menu.path}>
        {menu.name}
      </Link>
    ))
  }

  const isAuthName = authUser ? (
    <>
      <p>{authUser.displayName}</p>
    </>
  ) : (
    <></>
  )

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            MyApp
          </Typography>
          {menuList()}
          {isAuthName}
          <Search />
          <div className={classes.grow} />
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default withRouter(Navbar)
