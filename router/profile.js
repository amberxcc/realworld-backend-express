const express = require('express')
const profileController = require('../controller/profile')

const router = express.Router()

// 获取用户profile
router.get('/:username', profileController.getProfile)

// 关注
router.post('/:username/follow', profileController.follow)

// 取消关注
router.delete('/:username/follow', profileController.unfollow)

module.exports = router