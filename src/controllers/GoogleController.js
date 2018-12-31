const GoogleService = require('../services/GoogleService')

exports.searchImage = async (req, res, next) => {
  if (!req.query.q) {
    res.status(200).json({
      'status': 'error',
      'message': `"q" parameter required`
    })
  }

  let PAGE = 0
  if (req.query.page) {
    if (!Number(req.query.page + 1)) {
      res.status(200).json({
        'status': 'error',
        'message': `"page" parameter must be a number`
      })
    }
    PAGE = Number(req.query.page)
  }
  if (PAGE < 0) {
    res.status(200).json({
      'status': 'error',
      'message': `"page" parameter must be greater than -1`
    })
  }
  try {
    const images = await GoogleService.getImage(req.query.q, PAGE)
    res.status(200).json(images)
    // next()
  } catch (err) {
    res.status(404).json({
      'status': 'error',
      'message': 'Uknown error'
    })
    console.error(err)
  }
}

exports.searchArticle = async (req, res, next) => {
  if (!req.query.q) {
    res.status(200).json({
      'status': 'error',
      'message': `"q" parameter required`
    })
  }

  let PAGE = 0
  if (req.query.page) {
    if (!Number(req.query.page + 1)) {
      res.status(200).json({
        'status': 'error',
        'message': `"page" parameter must be a number`
      })
    }
    PAGE = Number(req.query.page)
  }
  if (PAGE < 0) {
    res.status(200).json({
      'status': 'error',
      'message': `"page" parameter must be greater than -1`
    })
  }

  try {
    const articles = await GoogleService.getArticle(req.query.q, PAGE)
    res.status(200).json(articles)
    // next()
  } catch (err) {
    res.status(404).json({
      'status': 'error',
      'message': 'Uknown error'
    })
    console.error(err)
  }
}
