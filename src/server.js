const fs = require('fs')
const next = require('next')
const util = require('util')
const express = require('express')
const pathToRegExp = require('path-to-regexp')
const { parse } = require('url')
const routes = require('./route')
const uglifyjs = require('uglify-es')
const server = express()
const fetch = require('node-fetch')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handler = routes.getRequestHandler(app)
const port = 3000

global.fetch = fetch

app.prepare().then(() => {
  server.use(handler)

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`) // eslint-disable-line
  })
})
