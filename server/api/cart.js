const router = require('express').Router()
module.exports = router
const Order = require('../db/models/order')
const Order_Product = require('../db/models/order_product')

//get items in the cart for the current user
router.get('/:userId', async (req, res, next) => {
  try {
    const createdOrdersById = await Order.findAll({
      where: {
        userId: req.params.userId,
        status: 'created'
      },
      include: {all: true}
    })
    res.json(createdOrdersById)
  } catch (err) {
    next(err)
  }
})
//remove product from the order
router.put('/:userId', async (req, res, next) => {
  try {
    const createdOrdersById = await Order.findAll({
      where: {
        userId: req.params.userId,
        status: 'created'
      },
      include: {all: true}
    })
    console.log(createdOrdersById)
    await createdOrdersById[0].removeProduct(req.body.id)
    console.log(createdOrdersById)

    res.json(createdOrdersById)
  } catch (err) {
    next(err)
  }
})
//set checkoutprice
