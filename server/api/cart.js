const router = require('express').Router()
module.exports = router
const Order = require('../db/models/order')
const Order_Product = require('../db/models/order_product')

//get items in the cart for the current user
router.get('/:userId', async (req, res, next) => {
  try {
    console.log(1)
    const createdOrdersById = await Order.findAll({
      where: {
        userId: req.params.userId,
        status: 'created'
      },
      include: {all: true}
    })
    console.log(1)
    console.log(createdOrdersById)
    res.json(createdOrdersById)
  } catch (err) {
    next(err)
  }
})

//set checkoutprice
