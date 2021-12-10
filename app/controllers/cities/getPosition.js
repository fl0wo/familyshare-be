const { matchedData } = require('express-validator')
const City = require('../../models/position')
const { getItem } = require('../../middleware/db')
const { isIDGood, handleError } = require('../../middleware/utils')

/**
 * Get item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getPosition = async (req, res) => {
  try {
    req = matchedData(req)
    const id = await isIDGood(req.id)
    res.status(200).json(await getItem(id, City))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { getPosition: getPosition }
