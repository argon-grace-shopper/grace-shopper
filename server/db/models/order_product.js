const Sequelize = require('sequelize')
const db = require('../db')

const Order_Product = db.define('order_product', {
  cartQuantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  checkoutPrice: {
    type: Sequelize.DECIMAL(10, 2),
    defaultValue: null
  }
})

module.exports = Order_Product
