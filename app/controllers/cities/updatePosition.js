const { checkPositionExists } = require('./helpers/cityExists')
const { addNewPosition } = require('./helpers/getAllItemsFromDB')
const { handleError } = require("../../middleware/utils/handleError")
const updatePosition = async (req, res) => {
  try {
    let who = req.body.who;

    let newPos = {
      coords : {
        lat : req.body.lat,
        long : req.body.long
      },
      timestamp : new Date().getTime()
    }
    const existPosition = await checkPositionExists(who)
    if (existPosition) {
      res.status(200).json(await addNewPosition(newPos,who))
    } else {
      res.status(200).json("position does not exists")
    }
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { updatePosition: updatePosition }
