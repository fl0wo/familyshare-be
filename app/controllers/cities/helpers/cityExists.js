const Position = require('../../../models/position')
const { buildErrObject } = require('../../../middleware/utils')

const checkPositionExists = (who = '') => {

  console.log("whoooo??????? -> " + who)
  return new Promise((resolve, reject) => {
    Position.findOne(
      {
        who
      },
      async (err, user) => {
        if(err) resolve(false)
        else resolve(user!=null)
      }
    )
  })
}

module.exports = { checkPositionExists }
