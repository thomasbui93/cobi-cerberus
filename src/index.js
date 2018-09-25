const express = require('express')
const bodyParser = require('body-parser')
const compression = require('compression')
const dotenv = require('dotenv')

dotenv.config()
const { startup } = require('./util/bootstrap')
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(compression({ threshold: 0 }))

startup(app).then(() => {
  console.log('Startup check done')
  app.listen(3000, '0.0.0.0', (err) => {
    if (err) {
      console.log(err)
    }
    console.info('==> Open up http://0.0.0.0:%s/ in your browser.', 3000)
  })
}).catch(err => console.log)
  