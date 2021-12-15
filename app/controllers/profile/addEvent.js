const mongoose = require('mongoose')

const { isIDGood, handleError } = require('../../middleware/utils')
const User = require('../../models/user')
const Positions = require('../../models/position')
const {getMultipleItemByParam} = require('../../middleware/db/getItem')

const { addEventToProfile} = require("./helpers/updateProfileInDB");


/**
 * Update profile function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const addEvent = async (req, res) => {
  try {

    const id = await isIDGood(req.user._id)

    let title = req.body.title;
    let date_start = new Date().getTime();
    let date_end = new Date(date_start + (req.body.duration*1000)).getTime()

    User.findById(id,async (err,user)=>{
      if(err) throw err;
      if (user.childrens.length<=0) throw err;

      let event = {
        title : title,
        date_start : date_start,
        date_end : date_end,
        childrens : user.childrens.map(k=>({name : k.name,id : k.id}))
      }

      addEventToProfile(event, id)
        .then(addedEvent => {
          res.status(200)
            .json(addedEvent);
        }).catch(err => {
          res.status(200)
            .json(err);
      })
    });

  } catch (error) {
    handleError(res, error)
  }
}


const showEvent = async (req, res) => {
  try {

    const id = await isIDGood(req.user._id)

    User.findById(id,async (err,user)=>{
      if(err) throw err;
      const eventId = req.body.id;

      let ev = user.events.find(e=>{
        return e.id === eventId
      });

      let kidsIds = ev.childrens.map(k=>k.id);

      function isDateInsideEvent(timestamp,ev){
        return new Date(timestamp).getTime() <= new Date(ev.date_end).getTime() &&
          new Date(timestamp).getTime() >= new Date(ev.date_start).getTime()
      }

      getMultipleItemByParam(kidsIds, Positions)
        .then(myKidPos=>{

          let positionsBetweenThisEvent = myKidPos
            .map((kidMoves)=> {
                return {
                  positions: kidMoves.positions
                    .filter(m => isDateInsideEvent(m.timestamp,ev)),
                  color : kidMoves.color
                }
          });

          let ret = {
            event : ev,
            paths : positionsBetweenThisEvent
          }

          res.status(200).json(ret)
        })

    })

  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { addEvent, showEvent }
