const express = require('express')
const tagController = require('../controller/tag')

const router = express.Router()

// 获取tags
router.get('/', tagController.getTags)


module.exports = router