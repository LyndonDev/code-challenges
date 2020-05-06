const express = require('express')
const bodyParser = require('body-parser')

const user = require('../controllers/user')

const { authenticate } = require('../helpers/token')

const router = express.Router()
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

const authenticateUser = (req, res, next) => {
  const token = req.headers['authorization'].split(' ')[1]

  if (authenticate(token)) {
    return next()
  } else {
    res.status(401).json({ errors: [ { detail: 'Not authorized.' } ] })

    return false
  }
}

router.get('/', (req, res) => {
  res.sendStatus(200)
})

// Register a new user
router.post('/user', (req, res) => {
  const email = req.body.email
  const password = req.body.password

  user.register(email, password)
    .then(detail => res.status(201).json({ data: { detail } }))
    .catch(err => res.status(err.statusCode).json({ errors: [ { detail: err.detail } ] }))
})

router.post('/login', (req, res) => {
  const email = req.body.email
  const password = req.body.password

  user.login(email, password)
    .then(token => res.status(200).json({ data: { token } }))
    .catch(err => res.status(err.statusCode).json({ errors: [ { detail: err.detail } ] }))
})

// Get the user's current integer
router.get('/current', authenticateUser, (req, res) => {
  const token = req.headers['authorization'].split(' ')[1]

  user.getCurrentInteger(token)
    .then(data => res.status(200).json({ data }))
    .catch(err => res.status(err.statusCode).json({ errors: [ { detail: err.detail } ] }))
})

// Get the user's next integer
router.get('/next', authenticateUser, (req, res) => {
  const token = req.headers['authorization'].split(' ')[1]

  user.getNextInteger(token)
    .then(data => res.status(200).json({ data }))
    .catch(err => res.status(err.statusCode).json({ errors: [ { detail: err.detail } ] }))
})

// Reset the user's current integer to a provided value
router.put('/current', authenticateUser, (req, res) => {
  const token = req.headers['authorization'].split(' ')[1]
  const newInt = parseInt(req.body.current)

  user.putInteger(token, newInt)
    .then(data => res.status(200).json({ data }))
    .catch(err => res.status(err.statusCode).json({ errors: [ { detail: err.detail } ] }))
})

router.delete('/user', authenticateUser, (req, res) => {
  const token = req.headers['authorization'].split(' ')[1]

  user.unregister(token)
    .then(() => res.status(204).send())
    .catch(err => res.status(err.statusCode).json({ errors: [ { detail: err.detail } ] }))
})

module.exports = router
