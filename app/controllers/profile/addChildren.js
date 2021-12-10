const { isIDGood, handleError } = require('../../middleware/utils')
const { matchedData } = require('express-validator')
const { addChildrenToProfile } = require('./helpers/updateProfileInDB')

/**
 * Update profile function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const addChildren = async (req, res) => {
  try {
    const id = await isIDGood(req.user._id)
    let children = {
      name : req.body.childName,
      id : req.body.childId,
    }

    res.status(200).json(await addChildrenToProfile(children, id))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { addChildren }
