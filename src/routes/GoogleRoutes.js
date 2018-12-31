const express = require('express')
const router = express.Router()

const GoogleController = require('../controllers/GoogleController')

router.get('/article', GoogleController.searchArticle)
router.get('/image', GoogleController.searchImage)

module.exports = router
