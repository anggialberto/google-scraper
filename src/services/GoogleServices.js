const axios = require('axios')
const cheerio = require('cheerio')

const config = require('../config')

exports.getImage = async (query, page) => {
  try {
    const body = await axios({
      method: 'get',
      url: `${config.BASE_URL}${config.SEARCH_QUERY_PATH}`,
      params: {
        q: query,
        tbm: 'isch',
        ijn: page,
        start: page * 100
      },
      headers: {
        'User-Agent': config.USER_AGENT
      }
    })

    if (body.data) {
      const arrImages = []
      const $ = cheerio.load(body.data)
      const data = $('.rg_meta.notranslate').each((i, e) => {
        let tmp_e = JSON.parse($(e).text())
        let image = {}
        image['title'] = tmp_e['s']
        image['width'] = tmp_e['ow']
        image['height'] = tmp_e['oh']
        image['url'] = tmp_e['ou']
        image['source'] = tmp_e['isu']
        image['type'] = tmp_e['ity']
        arrImages[i] = image
      })
      return arrImages
    }
    return { 'status': 'ok', 'message': 'Image not found' }

  } catch (err) {
    throw err
  }
}

exports.getArticle = async (query, page) => {
  try {
    const body = await axios({
      method: 'get',
      url: `${config.BASE_URL}${config.SEARCH_QUERY_PATH}`,
      params: {
        q: query,
        start: page
      },
      headers: {
        'User-Agent': config.USER_AGENT
      }
    })
    if (body.data) {
      const $ = cheerio.load(body.data)
      const checkAvailability = $('.std.uc.card-section.f.ucm').text()
      if (!checkAvailability) {
        const arrArticles = []
        const data = $('div.rc').each((i, e) => {
          let article = {}
          article['title'] = $(e).children('.r').find('h3').text()
          article['desc'] = $(e).children('.s').find('.st').text()
          article['url'] = $(e).children('.r').find('a').attr('href')
          arrArticles[i] = article
        })
        return arrArticles
      }
      return { 'status': 'ok', 'message': 'Article not found' }
    }
  } catch (err) {
    throw err
  }
}