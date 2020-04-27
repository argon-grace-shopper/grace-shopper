const router = require('express').Router()
module.exports = router
const {Order, Product} = require('../db/models')

const findByUser = (req) => {
  if (req.user) {
    return {
      where: {
        userId: req.user.dataValues.id,
        status: 'created',
      },
      include: {all: true},
    }
  }
}

const getGuestCart = async (req) => {
  // this helper function retrieves the guest cart and outputs the
  // guest cart in a structure that mimics a logged-in user's cart

  // req.session.cart = {'productId' : quantity }
  // e.g.
  // { '2': 4,
  //   '3': 1 }

  const productIdAry = Object.keys(req.session.cart)
  const productAry = []

  for (i in productIdAry) {
    const prodId = productIdAry[i]
    const productObj = await Product.findByPk(prodId)
    const product = productObj.dataValues
    product.order_product = {
      cartQuantity: req.session.cart[prodId],
    }
    productAry.push(product)
  }

  const output = [
    {
      id: 'Guest Order',
      products: productAry,
    },
  ]

  return output
}

//get items in the cart for the current user
router.get('/', async (req, res, next) => {
  try {
    if (req.user) {
      const createdOrdersById = await Order.findAll(findByUser(req))
      res.json(createdOrdersById)
    } else {
      const guestCart = await getGuestCart(req)
      console.log(
        'THIS IS WHAT GUEST CART LOOKS LIKE IN GET /CART: ',
        guestCart
      )
      res.json(guestCart)
    }
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
    if (req.user) {
      const createdOrdersById = await Order.findAll(findByUser(req))
      await createdOrdersById[0].addProduct(req.body.id, {
        through: {cartQuantity: req.body.order_product.cartQuantity},
      })
      res.json(createdOrdersById[0])
    } else {
      req.session.cart[req.body.id] = req.body.order_product.cartQuantity
      const guestCart = getGuestCart(req)
      res.json(guestCart)
    }
  } catch (err) {
    next(err)
  }
})

router.post('/add-to-cart/', async (req, res, next) => {
  try {
    if (req.user) {
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
    } else {
      const productId = req.body.product.id
      if (!req.session.cart) {
        req.session.cart = {
          [productId]: 1,
        }
      } else if (!req.session.cart[productId]) {
        req.session.cart[productId] = 1
      } else if (req.session.cart[productId]) {
        req.session.cart[productId]++
      } else {
        console.log(
          'SOMETHING WEIRD HAPPENED IN THE API ROUTE FOR ADD CART - SESSIONS'
        )
      }

      req.session.save()

      const guestCart = await getGuestCart(req)

      res.json(guestCart[0])
      // async/await does not work in array methods (map, forEach, etc)
      // const productAry = productIdAry.map(async (prodId) => {
      // 	const product = await Product.findByPk(prodId);
      // 	return product;
      // });
    }
  } catch (err) {
    next(err)
  }
})

//set checkoutprice
