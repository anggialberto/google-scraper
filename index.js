const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const routes = require('./src/routes')

// body parser
app.use(bodyParser.urlencoded({ extended: false }))

//inisialisasi routes
app.use(routes(express))

// inisialisasi port
const PORT = process.env.PORT || 3000

// run server
app.listen(PORT, () => {
  console.log(`server listen on port ${PORT}`)
})