const router = require('express').Router()
const {Order, Product} = require('../db/models')
const {checkIsLoggedIn} = require('./security')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    res.send(req.user)
  } catch (err) {
    next(err)
  }
})

router.get('/orders', checkIsLoggedIn, async (req, res, next) => {
  try {
    req.user.orders = await Order.findAll({
      where: {userId: req.user.id, status: 'complete'},
      include: {model: Product},
    })
    const orders = req.user.orders

    res.send(orders)
  } catch (err) {
    next(err)
  }
})

// const array1 = [1, 2, 3, 4]
// const reducer = (accumulator, currentValue) => accumulator + currentValue
