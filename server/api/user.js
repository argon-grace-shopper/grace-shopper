const router = require('express').Router()
const {Order, Product} = require('../db/models')
const {checkIsLoggedIn} = require('./security')

module.exports = router

// router.get('/', async (req, res, next) => {
//   try {
//     res.send(req.user)
//   } catch (err) {
//     next(err)
//   }
// })

router.get('/', (req, res, next) => {
  const user = req.user
  const session = req.session

  session.seshId = 6

  // if (!session.cart) {
  //   session.cart = 1
  // } else {
  //   session.cart++
  // }
  console.log('user', user)
  // console.log('session', session)
  res.json({user, session})
})

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

// const array1 = [1, 2, 3, 4]
// const reducer = (accumulator, currentValue) => accumulator + currentValue
