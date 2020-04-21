const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
  description: {
    type: Sequelize.TEXT,
    validate: {
      min: {
        args: [100]
      }
    }
  }
})

module.exports = Review
