const { changePassword } = require('./changePassword')
const { getProfile } = require('./getProfile')
const { updateProfile } = require('./updateProfile')
const {addChildren , deleteChildren} = require('./addChildren')

module.exports = {
  changePassword,
  getProfile,
  updateProfile,
  addChildren,
  deleteChildren
}
