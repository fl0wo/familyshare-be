const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const colorValidator = (v) => {
  return v.startsWith("#")
}

const PositionSchema = new mongoose.Schema(
  {
    who: {
      type: String,
      required: true
    },
    color: {
      type: String,
      validator: [colorValidator, '#000'],
      required: true,
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
