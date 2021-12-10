const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const PositionSchema = new mongoose.Schema(
  {
    who: {
      type: String,
      required: true
    },
    positions: [
      {
        coords: {
          lat: Number,
          long: Number
        },
        timestamp: Number
      }
    ]
  },
  {
    versionKey: false,
    timestamps: true
  }
)
PositionSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Position', PositionSchema)
