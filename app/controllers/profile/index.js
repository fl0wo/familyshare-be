const { changePassword } = require('./changePassword')
const { getProfile } = require('./getProfile')
const { updateProfile } = require('./updateProfile')
const {addChildren , deleteChildren} = require('./addChildren')
const {addEvent, showEvent} = require('./addEvent')

module.exports = {
  changePassword,
  getProfile,
  updateProfile,
  addChildren,
  deleteChildren,
  addEvent,
  showEvent
}
