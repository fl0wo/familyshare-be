const Positions = require('../../../models/position')
const { buildErrObject } = require('../../../middleware/utils')

/**
 * Gets all items from database
 */
const getAllItemsFromDB = () => {
  return new Promise((resolve, reject) => {
    Positions.find(
      {},
      '-updatedAt -createdAt',
      {
        sort: {
          name: 1
        }
      },
      (err, items) => {
        if (err) {
          return reject(buildErrObject(422, err.message))
        }
        resolve(items)
      }
    )
  })
}


const addNewPosition = (position = {}, id = '') => {
  return new Promise((resolve, reject) => {
    Positions.findOneAndUpdate(
      {who : id},
      { $push: { positions: position  } },
      {
        new: true,
        runValidators: true,
        select: '-role -_id -updatedAt -createdAt'
      },
      async (err, doc) => {
        if (err) resolve(false)
        else resolve(doc!=null)
      }
    )
  })
}

module.exports = { getAllItemsFromDB , addNewPosition}
