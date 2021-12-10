const { isIDGood, handleError } = require('../../middleware/utils')
const { addChildrenToProfile } = require('./helpers/updateProfileInDB')
const Position = require('../../models/position')
const {createItem} = require("../../middleware/db/createItem")

/**
 * Update profile function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const addChildren = async (req, res) => {
  try {
    const id = await isIDGood(req.user._id)

    let qrCodeId = req.body.childId;
    let lat = req.body.lat;
    let long = req.body.long;
    let name = req.body.childName;

    let children = {
      name : name,
      id : qrCodeId,
    }

    addChildrenToProfile(children, id).then(addedChildren=>{
      createItem({
        who : qrCodeId.toString(),
        positions: [{
          coords : {
            lat: lat,
            long: long,
          },
          timestamp : new Date().getTime()
        }]
      },Position).then(created=>{
        res.status(200)
          .json(addedChildren);
      })
    })

  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { addChildren }
