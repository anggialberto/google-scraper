const express = require('express')
const router = express.Router()

const GoogleController = require('../controllers/GoogleController')

router.get('/google/article', GoogleController.searchArticle)
router.get('/google/image', GoogleController.searchImage)

module.exports = router