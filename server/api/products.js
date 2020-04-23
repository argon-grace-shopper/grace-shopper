const router = require('express').Router()
const {Product, Review, Order} = require('../db/models')
module.exports = router

router.get('/:productId', async (req, res, next) => {
  try {
    console.log('in product route')
    const product = await Product.findByPk(req.params.productId, {
      include: Review,
      Order
    })
    res.json(product)
  } catch (err) {
    next(err)
  }
})
