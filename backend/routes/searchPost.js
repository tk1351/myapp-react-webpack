const express = require('express')
const router = express.Router()
const searchPostController = require('../controllers/searchPost')

router.get('/posts', searchPostController.getSearchResult)

module.exports = router
