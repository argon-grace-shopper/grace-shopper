const router = require('express').Router()
module.exports = router
const Order = require('../db/models/order')
const Order_Product = require('../db/models/order_product')

const findByUser = (req) => {
  if (req.user) {
    return {
      where: {
        userId: req.user.dataValues.id,
        status: 'created',
      },
      include: {all: true},
    }
  } else {
    console.log('>>>>> req.session', req.session)
    // return {
    //   where: {
    //     userId: req.session.id,
    //     status: 'created'
    //   },
    //   include: {all: true}
    // }
  }
}

//get items in the cart for the current user
router.get('/', async (req, res, next) => {
  try {
    const createdOrdersById = await Order.findAll(findByUser(req))
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
    console.log('>>>> req.user', req.user)
    const createdOrdersById = await Order.findOrCreate({
      where: {
        userId: req.user.id,
        status: 'created',
      },
      defaults: {
        userId: req.user.id,
        status: 'created',
      },
    })
    await createdOrdersById[0].addProduct(req.body.product.id)

    res.json(createdOrdersById[0])
  } catch (err) {
    next(err)
  }
})

//set checkoutprice
