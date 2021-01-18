import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import Container from '@material-ui/core/Container'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      '& > * + *': {
        marginLeft: theme.spacing(2),
      },
    },
  })
)

const Spinner = () => {
  const classes = useStyles()
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.root}>
        <CircularProgress />
      </div>
    </Container>
  )
}

export default Spinner
