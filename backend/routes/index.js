const express = require('express')
const postRoutes = require('./post')
const userRoutes = require('./user')
const categoryRoutes = require('./category')
const searchPostRoutes = require('./searchPost')
const commentRoutes = require('./comment')

const router = express.Router()

router.use('/post', postRoutes)
router.use('/user', userRoutes)
router.use('/category', categoryRoutes)
router.use('/search', searchPostRoutes)
router.use('/comment', commentRoutes)

module.exports = router
