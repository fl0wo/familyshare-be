const User = require('../../../models/user')
const { itemNotFound } = require('../../../middleware/utils')

/**
 * Updates profile in database
 * @param {Object} req - request object
 * @param {string} id - user id
 */
const updateProfileInDB = (req = {}, id = '') => {
  return new Promise((resolve, reject) => {
    User.findByIdAndUpdate(
      id,
      req,
      {
        new: true,
        runValidators: true,
        select: '-role -_id -updatedAt -createdAt'
      },
      async (err, user) => {
        try {
          await itemNotFound(err, user, 'NOT_FOUND')
          resolve(user)
        } catch (error) {
          reject(error)
        }
      }
    )
  })
}

/**
 * Updates profile in database
 * @param {Object} children - request object
 * @param {string} id - user id
 */
const addChildrenToProfile = (children = {}, id = '') => {
  return new Promise((resolve, reject) => {
    User.findByIdAndUpdate(
      id,
      { $push: { childrens: children  } },
      {
        new: true,
        runValidators: true,
        select: '-role -_id -updatedAt -createdAt'
      },
      async (err, user) => {
        try {
          await itemNotFound(err, user, 'NOT_FOUND')
          resolve(user)
        } catch (error) {
          reject(error)
        }
      }
    )
  })
}


const removeAllChildrenToProfile = (id = '') => {
  return new Promise((resolve, reject) => {
    User.findByIdAndUpdate(
      id,
      { $set: { childrens: []  } },
      {
        new: true,
        runValidators: true,
        select: '-role -_id -updatedAt -createdAt'
      },
      async (err, done) => {
        try {
          await itemNotFound(err, done, 'NOT_FOUND')
          resolve(done)
        } catch (error) {
          reject(error)
        }
      }
    )
  })
}


/**
 * Updates profile in database
 * @param {Object} children - request object
 * @param {string} id - user id
 */
const addEventToProfile = (event = {}, id = '') => {
  return new Promise((resolve, reject) => {
    User.findByIdAndUpdate(
      id,
      { $push: { events: event  } },
      {
        new: true,
        runValidators: true,
        select: '-role -_id -updatedAt -createdAt'
      },
      async (err, user) => {
        try {
          await itemNotFound(err, user, 'NOT_FOUND')
          resolve(user)
        } catch (error) {
          reject(error)
        }
      }
    )
  })
}




module.exports = { updateProfileInDB , addChildrenToProfile , removeAllChildrenToProfile, addEventToProfile }
