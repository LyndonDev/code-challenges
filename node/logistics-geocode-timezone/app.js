const express = require('express')

const syncRoutes = require('./routes/sync')

const app = express()

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Methods', 'GET')

  next()
})

app.use('/', syncRoutes)

module.exports = app
