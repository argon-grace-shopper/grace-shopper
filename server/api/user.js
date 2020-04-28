const router = require('express').Router()
const {Order, Product} = require('../db/models')
const {checkIsLoggedIn} = require('./security')

module.exports = router

router.get('/completeOrders', checkIsLoggedIn, async (req, res, next) => {
  try {
    req.user.orders = await Order.findAll({
      where: {userId: req.user.id, status: 'complete'},
      include: {model: Product},
    })
    const completeOrders = req.user.orders

    res.send(completeOrders)
  } catch (err) {
    next(err)
  }
})

router.get('/allOrders', checkIsLoggedIn, async (req, res, next) => {
  try {
    req.user.orders = await Order.findAll({
      where: {userId: req.user.id},
      include: {model: Product},
    })
    const allOrders = req.user.orders

    res.send(allOrders)
  } catch (err) {
    next(err)
  }
})
