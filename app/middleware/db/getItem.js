const { itemNotFound } = require('../../middleware/utils')

/**
 * Gets item from database by id
 * @param {string} id - item id
 */
const getItem = (id = '', model = {}) => {
  return new Promise((resolve, reject) => {
    model.findById(id, async (err, item) => {
      try {
        await itemNotFound(err, item, 'NOT_FOUND')
        resolve(item)
      } catch (error) {
        reject(error)
      }
    })
  })
}

const getMultipleItemByParam = (whos = [], model = {}) => {
  return new Promise((resolve, reject) => {
    model.find({who : {$in : whos}}, async (err, item) => {
      if(err) reject(err);
      resolve(item);
    })
  })
}

const getItemByParam = (who = '', model = {}) => {
  return new Promise((resolve, reject) => {
    model.findOne({who}, async (err, item) => {
      if(err) return err;
      return item;
    })
  })
}

module.exports = { getItem, getMultipleItemByParam: getMultipleItemByParam}
