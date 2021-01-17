const express = require('express')
const router = express.Router()
const postController = require('../controllers/post')

router.get('', postController.getAllPosts)
router.get('/user/:uid', postController.getPostsByUid)
router.get('/:postId', postController.getPostsById)
router.post('', postController.addPost)
router.put('/:postId', postController.putById)
router.delete('/:postId', postController.deleteById)
router.delete('/user/:uid', postController.deleteByUid)

module.exports = router
