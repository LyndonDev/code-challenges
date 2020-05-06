const bcrypt = require('bcryptjs')

const user = require('../models/user')

const { validateEmail, validatePassword, validateInteger } = require('../helpers/validators')
const { generateToken, getUserId } = require('../helpers/token')
const { formatError } = require('../helpers/error')

const register = (email, password) => {
  return new Promise((resolve, reject) => {
    if (!validateEmail(email)) {
      reject(formatError(400, 'Invalid email.'))
    }

    if (!validatePassword(password)) {
      reject(formatError(400, 'Invalid password. Password must contain a lowercase letter, an uppercase letter, a number, a special character, and be at least 6 characters long.'))
    }

    // Check if user already exists
    user.checkEmail(email)
      .then(empty => {
        if (empty) {
          return resolve(createUser(email, password))
        }

        return reject(formatError(403, 'This email is already registered.'))
      })
      .catch(err => reject(formatError(500, 'Error: Could not check email.', err)))
  })
}

const createUser = (email, password) => {
  return user.create(email, password)
    .then(id => 'Account created. You may now use the system.')
    .catch(err => formatError(500, 'Error: Account could not be created.', err))
}

const login = (email, password) => {
  return new Promise((resolve, reject) => {
    user.getByEmail(email)
      .then(user => {
        if (user) {
          // Authenticate the provided password
          if (bcrypt.compareSync(password, user.password)) {
            // Generate an access token
            const token = generateToken({ id: user.id })

            return resolve(token)
          }
        }

        // No user found with provided email or passwords don't match
        return reject(formatError(400, 'Invalid email or password.'))
      })
      .catch(err => reject(formatError(500, 'Error: Authentication error.', err)))
  })
}

const getCurrentInteger = (token) => {
  const userId = getUserId(token)

  return user.getById(userId)
    .then(user => {
      return { int: user.int }
    })
    .catch(err => formatError(500, 'Error: Could not retrieve user data.', err))
}

const getNextInteger = (token) => {
  const userId = getUserId(token)

  return user.getById(userId)
    .then(user => {
      const nextInt = user.int + 1

      return setInteger(userId, nextInt)
    })
    .catch(err => formatError(500, 'Error: Could not retrieve user data.', err))
}

const setInteger = (id, int) => {
  const payload = { int }

  return user.update(id, payload)
    .then(() => payload)
    .catch(err => formatError(500, 'Error: Could not update user data.', err))
}

const putInteger = (token, newInt) => {
  return new Promise((resolve, reject) => {
    if (!validateInteger(newInt)) {
      reject(formatError(400, 'Integer must be a positive number.'))
    }

    const userId = getUserId(token)

    resolve(setInteger(userId, newInt))
  })
}

const unregister = (token) => {
  const userId = getUserId(token)

  return user.deleteUser(userId)
    .catch(err => formatError(500, 'Error: Could not delete user.', err))
}

module.exports = {
  register,
  login,
  getCurrentInteger,
  getNextInteger,
  putInteger,
  unregister
}
