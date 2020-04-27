const router = require('express').Router()
const {Order, Product} = require('../db/models')
const {checkIsLoggedIn} = require('./security')

module.exports = router

router.get('/orders', checkIsLoggedIn, async (req, res, next) => {
  try {
    req.user.orders = await Order.findAll({
      where: {userId: req.user.id, status: 'complete'},
      include: {model: Product}
    })
    const orders = req.user.orders

    res.send(orders)
  } catch (err) {
    next(err)
  }
})
