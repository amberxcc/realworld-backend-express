const express = require('express')
const profileController = require('../controller/profile')
const profileValidator = require('../validator/profile')
const auth = require('../middleware/auth')

const router = express.Router()

// 获取用户profile
router.get('/:username', profileValidator.getProfile, profileController.getProfile)

// 关注
router.post('/:username/follow', auth, profileValidator.follow, profileController.follow)

// 取消关注
router.delete('/:username/follow', auth, profileValidator.unfollow, profileController.unfollow)

module.exports = router