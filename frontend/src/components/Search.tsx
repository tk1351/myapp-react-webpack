import React, { useState } from 'react'
import { Formik, Form } from 'formik'
import {
  makeStyles,
  Theme,
  createStyles,
  fade,
  InputBase,
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import { useDispatch } from 'react-redux'
import { searchPosts } from '../features/searchSlice'
import { RouteComponentProps, withRouter } from 'react-router-dom'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  })
)

interface QueryParam {
  q: string
}

interface Props extends RouteComponentProps {}

const initialValue = {
  q: '',
}

const Search = ({ history }: Props) => {
  const classes = useStyles()
  const [queryParam, setQueryParam] = useState<QueryParam>(initialValue)

  const dispatch = useDispatch()

  const searchUsingQueryParam = (values: QueryParam) => {
    if (values) {
      dispatch(
        searchPosts({
          values,
        })
      )
      setQueryParam(initialValue)
    }
  }

  return (
    <>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <Formik
          initialValues={initialValue}
          onSubmit={(values) => {
            searchUsingQueryParam(values)
            history.push({
              pathname: `/search?q=${values.q}`,
              state: { values },
            })
          }}
        >
          {({ values, handleChange }) => (
            <Form>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                value={values.q}
                onChange={handleChange}
                name="q"
                type="search"
              />
            </Form>
          )}
        </Formik>
      </div>
    </>
  )
}

export default withRouter(Search)
