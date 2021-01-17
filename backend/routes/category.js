const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/category')

router.get('', categoryController.getAllCategories)
router.get('', categoryController.getCategoryById)
router.post('', categoryController.addCategory)

module.exports = router
