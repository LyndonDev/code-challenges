const express = require('express')

const userRoutes = require('./routes/user')

const app = express()

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
  res.header('Media-Type', 'application/vnd.api+json')

  next()
})
app.use('/', userRoutes)

module.exports = app
