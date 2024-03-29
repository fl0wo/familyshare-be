const Positions = require('../../models/position')
const User = require('../../models/user')

const { getItem, getMultipleItemByParam } = require('../../middleware/db')
const { isIDGood, handleError } = require('../../middleware/utils')

const MAX_POSITION_NUMBER = 30;
/**
 * Get item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getPosition = async (req, res) => {
  try {
    let myId = req.user._id;

    const id = await isIDGood(myId)

    // TODO: add projection only childs id
    User.findById(id,async (err,user)=>{

      let myKidsId = user.childrens.map(kid=>kid.id);

      getMultipleItemByParam(myKidsId, Positions)
        .then(myKidPos=>{

          let latestNPositions = myKidPos.map(kidMoves=>{

            if(kidMoves.positions.length > MAX_POSITION_NUMBER) {
               kidMoves.positions
                 = kidMoves.positions.slice(-MAX_POSITION_NUMBER);
            }

            return kidMoves;
          });


          res.status(200).json(
            latestNPositions
          )
      })

    })

  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { getPosition: getPosition }
