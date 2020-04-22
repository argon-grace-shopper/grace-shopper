const router = require('express').Router()
const {Product, Category, Review} = require('../db/models')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      include: Category
    })
    res.send(products)
  } catch (err) {
    next(err)
  }
})

router.post('/', (req, res, next) => {
  Product.create(req.body)
    .then(product => res.send(product))
    .catch(next)
})

router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId, {
      include: Review
    })
    res.send(product)
  } catch (err) {
    next(err)
  }
})

router.put('/:productId', (req, res, next) => {
  Product.findByPk(req.params.productId)
    .then(product => product.update(req.body))
    .then(product => res.send(product))
    .catch(next)
})

router.delete('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(+req.params.productId)
    if (!product) return res.sendStatus(404)
    await product.destroy()
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})
