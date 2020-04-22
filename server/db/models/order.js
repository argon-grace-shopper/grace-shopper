const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM('created', 'processing', 'complete', 'cancelled'),
    defaultValue: 'created'
  }
})

module.exports = Order
