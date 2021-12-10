const express = require('express')
const router = express.Router()
require('../../config/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
  session: false
})
const trimRequest = require('trim-request')

const { roleAuthorization } = require('../controllers/auth')

const {
  getPosition,
  createPosition,
  updatePosition
} = require('../controllers/cities')

const {
  validateCreateCity
} = require('../controllers/cities/validators')

// router.get('/all', getAllCities)

router.get(
  '/',
  requireAuth,
  roleAuthorization(['user','admin']),
  trimRequest.all,
  getPosition
)

/*
The parent creates the position of the kid when he
 register his qrcode

router.post(
  '/',
  requireAuth,
  roleAuthorization(['user']),
  trimRequest.all,
  validateCreateCity,
  createPosition
)
 */

router.patch(
  '/',
  trimRequest.all,
  updatePosition
)

module.exports = router
