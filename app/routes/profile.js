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
  getProfile,
  updateProfile,
  changePassword,
  addChildren,
  deleteChildren,
  addEvent,
  showEvent
} = require('../controllers/profile')

const {
  validateUpdateProfile,
  validateChangePassword
} = require('../controllers/profile/validators')

/*
 * Profile routes
 */

/*
 * Get profile route
 */
router.get(
  '/',
  requireAuth,
  roleAuthorization(['user', 'admin']),
  trimRequest.all,
  getProfile
)

/*
 * Update profile route
 */
router.patch(
  '/',
  requireAuth,
  roleAuthorization(['user', 'admin']),
  trimRequest.all,
  validateUpdateProfile,
  updateProfile
)

/*
 * Change password route
 */
router.post(
  '/changePassword',
  requireAuth,
  roleAuthorization(['user', 'admin']),
  trimRequest.all,
  validateChangePassword,
  changePassword
)

/*
 * Add children
 */
router.post(
  '/kid/add',
  requireAuth,
  roleAuthorization(['user', 'admin']),
  trimRequest.all,
  addChildren
)

/*
 * Remove all kids
 */
router.delete(
  '/kid/delete',
  requireAuth,
  roleAuthorization(['user', 'admin']),
  trimRequest.all,
  deleteChildren
)

/*
 * Add event
 */
router.post(
  '/event/add',
  requireAuth,
  roleAuthorization(['user', 'admin']),
  trimRequest.all,
  addEvent
)

/*
 * Show event
 */
router.post(
  '/event/show',
  requireAuth,
  roleAuthorization(['user', 'admin']),
  trimRequest.all,
  showEvent
)

module.exports = router
