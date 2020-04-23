const router = require('express').Router()
module.exports = router
const Order = require('../db/models/order')
const Order_Product = require('../db/models/order_product')

const findByUser = (req) => {
  return {
    where: {
      userId: req.user.dataValues.id,
      status: 'created',
    },
    include: {all: true},
  }
}

//get items in the cart for the current user
router.get('/', async (req, res, next) => {
  try {
    console.log(req.user.dataValues.id)
    const createdOrdersById = await Order.findAll(findByUser(req))
    console.log(createdOrdersById)
    res.json(createdOrdersById)
  } catch (err) {
    next(err)
  }
})

router.put('/remove-from-cart/', async (req, res, next) => {
  try {
    const createdOrdersById = await Order.findAll(findByUser(req))
    await createdOrdersById[0].removeProduct(req.body.id)
    res.json(createdOrdersById)
  } catch (err) {
    next(err)
  }
})
router.put('/update-qty/', async (req, res, next) => {
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

router.post('/add-to-cart/', async (req, res, next) => {
  try {
    const createdOrdersById = await Order.findOrCreate(findByUser(req))
    await createdOrdersById.addProduct(req.body.id)
    res.json(createdOrdersById)
  } catch (err) {
    next(err)
  }
})

//set checkoutprice
