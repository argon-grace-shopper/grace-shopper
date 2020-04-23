const router = require('express').Router()
module.exports = router
const Order = require('../db/models/order')
const Order_Product = require('../db/models/order_product')

const findByUser = (req) => {
  return {
    where: {
      userId: req.params.userId,
      status: 'created',
    },
    include: {all: true},
  }
}

router.get('/', (req, res, next) => {
  const user = req.user
  const session = req.session
  if (!session.cart) {
    session.cart = 1
  } else {
    session.cart++
  }
  console.log('user', user)
  console.log('session', session)
  res.json({user, session})
})

//get items in the cart for the current user
router.get('/:userId', async (req, res, next) => {
  try {
    const usersOrders = await req.user.getOrders()
    const createdOrdersById = await Order.findAll(findByUser(req))
    res.json(createdOrdersById)
  } catch (err) {
    next(err)
  }
})

router.put('/remove-from-cart/:userId', async (req, res, next) => {
  try {
    const createdOrdersById = await Order.findAll(findByUser(req))
    await createdOrdersById[0].removeProduct(req.body.id)
    res.json(createdOrdersById)
  } catch (err) {
    next(err)
  }
})
router.put('/update-qty/:userId', async (req, res, next) => {
  try {
    const createdOrdersById = await Order.findAll(findByUser(req))
    await createdOrdersById[0].addProduct(req.body.id, {
      through: {cartQuantity: req.body.order_product.cartQuantity},
    })
    res.json(createdOrdersById[0])
  } catch (err) {
    next(err)
  }
})

router.post('/add-to-cart/:userId', async (req, res, next) => {
  try {
    const createdOrdersById = await Order.findAll(findByUser(req))
    await createdOrdersById[0].addProduct(req.body.id)
    res.json(createdOrdersById[0])
  } catch (err) {
    next(err)
  }
})

//set checkoutprice
