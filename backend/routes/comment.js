const express = require('express')
const router = express.Router()
const commentsController = require('../controllers/comment')

router.get('', commentsController.getAllComments)
router.get('/:uid', commentsController.getCommentsByUid)
router.get('/post/:postId', commentsController.getCommentsByPostId)
router.post('', commentsController.addComment)

module.exports = router
