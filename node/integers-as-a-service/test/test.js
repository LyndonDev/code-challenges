require('dotenv').config()
const supertest = require('supertest')
const should = require('should')
const jwt = require('jsonwebtoken')

const server = supertest.agent('http://localhost:5001/thinkific-challenge-19372/us-central1/api')

// Testing variables
const testEmail = 'test@user.com'
const testPassword = 'abc-ABC1'

const invalidEmail = 'testuser.com'
const invalidPassword = 'abc-A'

const notFoundEmail = 'joeymcjoejoe@user.com'

let testUserToken = ''

let currentInt
const resetInt = 1111
const invalidInt = -1
const invalidIntType = 'a'

function checkErrorOutput (res) {
  const output = JSON.parse(res.text)

  output.errors.should.be.instanceOf(Array)
  output.errors.forEach(error => {
    error.should.be.instanceOf(Object)
    error.should.have.property('detail')
  })
}

function checkSuccessOutput (res) {
  const output = JSON.parse(res.text)

  output.data.should.be.instanceOf(Object)
  output.data.detail.should.be.instanceOf(String)
}

describe ('CREATE USER', function() {

  it ('Should return 400 if email or password not provided', function(done) {
    server
      .post('/user')
      .end((err, res) => {
        res.status.should.equal(400)
        checkErrorOutput(res)

        done()
      })
  })

  it ('Should return 400 if email is invalid', function(done) {
    server
      .post('/user')
      .send(`email=${invalidEmail}&password=${testPassword}`)
      .end((err, res) => {
        res.status.should.equal(400)
        checkErrorOutput(res)

        done()
      })
  })

  it ('Should return 400 if password is invalid', function(done) {
    server
      .post('/user')
      .send(`email=${testEmail}&password=${invalidPassword}`)
      .end((err, res) => {
        res.status.should.equal(400)
        checkErrorOutput(res)

        done()
      })
  })

  it ('Should allow a user to register with email and password', function(done) {
    server
      .post('/user')
      .send(`email=${testEmail}&password=${testPassword}`)
      .end((err, res) => {
        res.status.should.equal(201)
        checkSuccessOutput(res)

        done()
      })
  })

  it ('Should not allow an email to register twice', function(done) {
    server
      .post('/user')
      .send(`email=${testEmail}&password=${testPassword}`)
      .end((err, res) => {
        res.status.should.equal(403)
        checkErrorOutput(res)

        done()
      })
  })

})

describe ('LOGIN', function() {

  it ('Should reject invalid email', function(done) {
    server
      .post('/login')
      .send(`email=${invalidEmail}&password=${testPassword}`)
      .end((err, res) => {
        res.status.should.equal(400)
        checkErrorOutput(res)

        done()
      })
  })

  it ('Should reject invalid password', function(done) {
    server
      .post('/login')
      .send(`email=${testEmail}&password=${invalidPassword}`)
      .end((err, res) => {
        res.status.should.equal(400)
        checkErrorOutput(res)

        done()
      })
  })

  it ('Should reject an email not found in the database', function(done) {
    server
      .post('/login')
      .send(`email=${notFoundEmail}&password=${testPassword}`)
      .end((err, res) => {
        res.status.should.equal(400)
        checkErrorOutput(res)

        done()
      })
  })

  it ('Should issue an auth token on successful login', function(done) {
    server
      .post('/login')
      .send(`email=${testEmail}&password=${testPassword}`)
      .end((err, res) => {
        const output = JSON.parse(res.text)
        testUserToken = output.data.token

        res.status.should.equal(200)
        jwt.verify(testUserToken, process.env.JWT_SECRET)

        done()
      })
  })

})

describe ('INTEGER FUNCTIONS', function() {

  it (`Should get the current integer for ${testEmail}`, function(done) {
    server
      .get('/current')
      .set('Authorization', `Bearer ${testUserToken}`)
      .end((err, res) => {
        res.status.should.equal(200)
        const output = JSON.parse(res.text)

        output.data.int.should.be.instanceOf(Number)
        output.data.int.should.equal(0)

        currentInt = output.data.int

        done()
      })
  })

  it (`Should get the next integer for ${testEmail}`, function(done) {
    server
      .get('/next')
      .set('Authorization', `Bearer ${testUserToken}`)
      .end((err, res) => {
        res.status.should.equal(200)
        const output = JSON.parse(res.text)

        output.data.int.should.be.instanceOf(Number)
        output.data.int.should.equal(currentInt + 1)

        currentInt = output.data.int

        done()
      })
  })

  it (`Should let the user reset their current integer to a provided integer`, function(done) {
    server
      .put('/current')
      .set('Authorization', `Bearer ${testUserToken}`)
      .send(`current=${resetInt}`)
      .end((err, res) => {
        res.status.should.equal(200)
        const output = JSON.parse(res.text)

        output.data.int.should.be.instanceOf(Number)
        output.data.int.should.equal(resetInt)

        done()
      })
  })

  it (`Should fail if the user tries to reset their current integer with a negative value`, function(done) {
    server
      .put('/current')
      .set('Authorization', `Bearer ${testUserToken}`)
      .send(`current=${invalidInt}`)
      .end((err, res) => {
        res.status.should.equal(400)
        checkErrorOutput(res)

        done()
      })
  })

  it (`Should fail if the user tries to reset their current integer with a string`, function(done) {
    server
      .put('/current')
      .set('Authorization', `Bearer ${testUserToken}`)
      .send(`current=${invalidIntType}`)
      .end((err, res) => {
        res.status.should.equal(400)
        checkErrorOutput(res)

        done()
      })
  })

})

describe ('DELETE TEST USER', function() {
  it (`Should delete the test user ${testEmail}`, function(done) {
    server
      .delete('/user')
      .set('Authorization', `Bearer ${testUserToken}`)
      .end((err, res) => {
        res.status.should.equal(204)
        res.text.should.equal('')

        done()
      })
  })
})
