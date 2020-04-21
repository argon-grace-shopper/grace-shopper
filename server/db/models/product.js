const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING
  },
  price: {
    type: Sequelize.FLOAT
  },
  inventoryQuantity: {
    type: Sequelize.INTEGER
  },
  light: {
    type: Sequelize.ENUM('low', 'medium', 'high')
  },
  style: {
    type: Sequelize.ENUM('blooming', 'pattern', 'vining')
  },
  size: {
    type: Sequelize.ENUM('small', 'medium', 'large')
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: 'image1.jpg'
  }
})

module.exports = Product
