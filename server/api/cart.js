const router = require('express').Router()
module.exports = router
const Order = require('../db/models/order')
const Order_Product = require('../db/models/order_product')
const Product = require('../db/models/product')

const findByUser = (req) => {
  return {
    where: {
      userId: req.user.dataValues.id,
      status: 'created',
    },
    include: {all: true},
  }
}

router.get('/', async (req, res, next) => {
  try {
    const createdOrdersById = await Order.findAll(findByUser(req))
    res.json(createdOrdersById)
  } catch (err) {
    next(err)
  }
})

router.put('/remove-from-cart', async (req, res, next) => {
  try {
    const createdOrdersById = await Order.findAll(findByUser(req))
    await createdOrdersById[0].removeProduct(req.body.id)
    res.json(createdOrdersById)
  } catch (err) {
    next(err)
  }
})

router.put('/update-qty', async (req, res, next) => {
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

router.post('/add-to-cart', async (req, res, next) => {
  try {
    const createdOrdersById = await Order.findAll(findByUser(req))
    console.log(req.body)
    await createdOrdersById[0].addProduct(req.body.product.id)
    res.json(createdOrdersById[0])
  } catch (err) {
    next(err)
  }
})

router.put('/save-checkout-price', async (req, res, next) => {
  try {
    await Order_Product.update(
      {
        checkoutPrice: req.body.product.price,
      },
      {
        where: {
          orderId: req.body.orderId,
          productId: req.body.product.id,
        },
      }
    )
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})

router.put('/order-status-update', async (req, res, next) => {
  try {
    await Order.update(
      {
        status: 'processing',
      },
      {
        where: {
          id: req.body.orderId,
        },
      }
    )
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})

router.put('/update-product-inventory', async (req, res, next) => {
  try {
    console.log(req.body)
    await Product.update(
      {
        inventoryQuantity: req.body.newInventoryQuantity,
      },
      {
        where: {
          id: req.body.productId,
        },
      }
    )
  } catch (err) {
    next(err)
  }
})
