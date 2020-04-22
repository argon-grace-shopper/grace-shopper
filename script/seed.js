/* eslint-disable max-statements */
'use strict'

const db = require('../server/db')
const {
  User,
  Product,
  Order,
  Review,
  Order_Product,
  Category
} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = [
    {email: 'cody@email.com', password: '123'},
    {email: 'murphy@email.com', password: '123'}
  ]

  const products = [
    {
      title: 'Eucalyptus',
      description:
        'has healing properties, koalas eat it, poisonous to most other things',
      price: 29.99,
      inventoryQuantity: 20,
      imageUrl:
        'https://www.parasperfumers.com/upload/product_ecom/Eucalyptus-Radiata-Essential-Oil-ProductPic.jpg'
    },
    {
      title: 'Aloe Vera',
      description: 'good for sunburns, poisonous to cats',
      price: 3.5,
      inventoryQuantity: 50,
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSlzFimnp1eBL0y4FkFNUJgQnWrRh0i4QlDdnP_ZtdjG2FEGBRc&usqp=CAU'
    },
    {
      title: 'Oak Seedling',
      description: 'will grow into a big tree, produces acorns',
      price: 10.0,
      inventoryQuantity: 8
    },
    {
      title: 'Tulip',
      description: 'pretty basic flower',
      price: 2.0,
      inventoryQuantity: 45
    },
    {
      title: 'Purple Passion Vine',
      description: 'fuzzy and purple',
      price: 9.5,
      inventoryQuantity: 23,
      imageUrl:
        'https://www.netclipart.com/pp/m/346-3467700_clip-art-purple-branch-purple-leaves-clip-art.png'
    }
  ]

  const categories = [
    {name: 'tree'},
    {name: 'flower'},
    {name: 'shrub'},
    {name: 'succulent'},
    {name: 'vine'}
  ]

  const reviews = [
    {description: 'Loved my aloe vera! 10/10 would recommend'},
    {description: 'I killed my purple passion vine'},
    {description: "My oak tree isn't growing fast enough"},
    {description: 'Aloe vera tastes funny'}
  ]
  console.log(Object.keys(User.prototype))

  const orders = [
    {status: 'processing'},
    {status: 'created', userId: 1},
    {status: 'complete'},
    {status: 'complete'},
    {status: 'cancelled'}
  ]
  const orderProducts = [
    {orderId: 1, productId: 1, cartQuantity: 1, checkoutPrice: 19.99},
    {orderId: 2, productId: 2, cartQuantity: 2, checkoutPrice: 29.99},
    {orderId: 2, productId: 1, cartQuantity: 1, checkoutPrice: 19.99},
    {orderId: 3, productId: 3, cartQuantity: 1, checkoutPrice: 39.99},
    {orderId: 4, productId: 4, cartQuantity: 3, checkoutPrice: 15.99},
    {orderId: 5, productId: 5, cartQuantity: 1, checkoutPrice: 29.99}
  ]

  await User.bulkCreate(users)
  await Product.bulkCreate(products)
  await Category.bulkCreate(categories)
  await Order.bulkCreate(orders)
  await Order_Product.bulkCreate(orderProducts)

  const eucalyptus = await Product.findByPk(1)
  await eucalyptus.setCategory(1)
  const aloe = await Product.findByPk(2)
  await aloe.setCategory(4)
  const oak = await Product.findByPk(3)
  await oak.setCategory(1)
  const tulip = await Product.findByPk(4)
  await tulip.setCategory(2)
  const purple = await Product.findByPk(5)
  await purple.setCategory(5)

  const cody = await User.findByPk(1)
  const aloeReview1 = await cody.createReview(reviews[0])
  await aloeReview1.setProduct(2)
  const purpReview = await cody.createReview(reviews[1])
  await purpReview.setProduct(5)
  const murphy = await User.findByPk(2)
  const oakReview = await murphy.createReview(reviews[2])
  await oakReview.setProduct(3)
  const aloeReview2 = await murphy.createReview(reviews[3])
  await aloeReview2.setProduct(2)

  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
