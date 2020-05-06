const jwt = require('jsonwebtoken')

const authenticate = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET)
}

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' })
}

const getUserId = (token) => {
  const decodedToken = jwt.decode(token)
  const userId = decodedToken.id

  return userId
}

module.exports = {
  authenticate,
  generateToken,
  getUserId
}
