const admin = require('firebase-admin')
const functions = require('firebase-functions')
const bcrypt = require('bcryptjs')

// Init Firebase Cloud Firestore
admin.initializeApp(functions.config().firebase)
const db = admin.firestore()
const usersCollection = db.collection('users')

// Check if email is already registered, return boolean
const checkEmail = (email) => {
  return usersCollection.where('email', '==', email)
    .get()
    .then(snapshot => snapshot.empty)
    .catch(err => err)
}

// Create user; return user id
const create = (email, password) => {
  const user = {
    email,
    password: bcrypt.hashSync(password, 8),
    int: 0
  }

  return usersCollection.add(user)
    .then(ref => ref.id)
    .catch(err => err)
}

// Get user by email, return object w/ id in it
const getByEmail = (email) => {
  return usersCollection.where('email', '==', email).limit(1).get()
    .then(querySnapshot => {
      if (querySnapshot.empty) {
        return false
      }

      // Create a normalized user object
      const data = querySnapshot.docs.map(documentSnapShot => {
        let user = documentSnapShot.data()
        user.id = documentSnapShot.id

        return user
      })
      const user = data[0]
      return user
    })
    .catch(err => err)
}

// Get user by id, return object
const getById = (id) => {
  return usersCollection.doc(id).get()
    .then(doc => doc.data())
    .catch(err => err)
}

const update = (id, payload) => {
  return usersCollection.doc(id).update(payload)
    .then(() => {
      return null
    })
    .catch(err => err)
}

const deleteUser = (id) => {
  return usersCollection.doc(id).delete()
    .then(() => {
      return null
    })
    .catch(err => err)
}

module.exports = {
  checkEmail,
  create,
  getByEmail,
  getById,
  update,
  deleteUser
}
