const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  pricePaid: {
    type: Sequelize.FLOAT
  },
  completed: {
    type: Sequelize.BOOLEAN
  }
})

module.exports = Order
