const { isIDGood, handleError } = require('../../middleware/utils')
const { addChildrenToProfile } = require('./helpers/updateProfileInDB')
const Position = require('../../models/position')
const {createItem} = require("../../middleware/db/createItem")
const User =     require('../../models/user')
const {removeAllChildrenToProfile} = require("./helpers/updateProfileInDB");

function insertInitialPositionKid(qrCodeId, children, lat, long, res, addedChildren) {
  createItem({
    who: qrCodeId.toString(),
    color: children.color,
    positions: [{
      coords: {
        lat: lat,
        long: long,
      },
      timestamp: new Date().getTime()
    }]
  }, Position).then(created => {
    res.status(200)
      .json(addedChildren);
  })
}

function addKidAndHisPosition(children, id, qrCodeId, lat, long, res) {
  addChildrenToProfile(children, id)
    .then(addedChildren => {
      insertInitialPositionKid(qrCodeId, children, lat, long, res, addedChildren);
    }).catch(err => {
    res.status(200)
      .json(err);
  })
}

function isAlreadyMyKid(user, qrCodeId) {
  return user.childrens.filter(k => k.id === qrCodeId).length > 0;
}

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
      color : colorArray[Math.floor(
        (Math.random()*colorArray.length)
      )].toString()
    }

    User.findById(id,async (err,user)=>{
      if(err) throw err;
      if(isAlreadyMyKid(user, qrCodeId)){
        console.log("cant insert twice same kid.")
        res.status(200).json("already present");
      } else {
        addKidAndHisPosition(children, id, qrCodeId, lat, long, res);
      }
    });

  } catch (error) {
    handleError(res, error)
  }
}

const deleteChildren = async (req, res) => {
  try {
    const id = await isIDGood(req.user._id)
    removeAllChildrenToProfile(id)
      .then(removed => {
        res.status(200).json(removed);
      }).catch(err => {
        res.status(200).json(err);
    });

  } catch (error) {
    handleError(res, error)
  }
}

let colorArray = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
  '#FF99E6', '#CCFF1A', '#602bea', '#E6331A', '#33FFCC',
  '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
  '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
  '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];

module.exports = { addChildren , deleteChildren}
