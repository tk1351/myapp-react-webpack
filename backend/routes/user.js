const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')

router.get('', userController.getAllUsers)
router.get('/:uid', userController.getUserById)
router.post('', userController.addUser)
router.put('/:uid', userController.putByUid)
router.delete('/:uid', userController.deleteByUid)

module.exports = router
