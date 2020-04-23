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

//get items in the cart for the current user
router.get('/:userId', async (req, res, next) => {
  try {
    const createdOrdersById = await Order.findAll(findByUser(req))
    res.json(createdOrdersById)
  } catch (err) {
    next(err)
  }
})
//remove product from the order
router.put('/remove-from-cart/:userId', async (req, res, next) => {
  try {
    const createdOrdersById = await Order.findAll(findByUser(req))
    // console.log(createdOrdersById[0].__proto__)
    await createdOrdersById[0].removeProduct(req.body.id)
    console.log(createdOrdersById)

    res.json(createdOrdersById)
  } catch (err) {
    next(err)
  }
})
router.put('/update-qty/:userId', async (req, res, next) => {
  try {
    const createdOrdersById = await Order.findAll(findByUser(req))
    //console.log(createdOrdersById.__proto__)
  } catch (err) {
    next(err)
  }
})

//set checkoutprice

//magic methods
// getUser: [Function],
// setUser: [Function],
// createUser: [Function],
// getProducts: [Function],
// countProducts: [Function],
// hasProduct: [Function],
// hasProducts: [Function],
// setProducts: [Function],
// addProduct: [Function],
// addProducts: [Function],
// removeProduct: [Function],
// removeProducts: [Function],
// createProduct: [Function]
