const router = require('express').Router()
const {Order} = require('../db/models')
const {checkIsLoggedIn} = require('./security')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const data = await Order.findAll({
      include: {all: true},
    })

    console.log('heyyyy', data)

    res.send(data)
  } catch (err) {
    next(err)
  }
})
