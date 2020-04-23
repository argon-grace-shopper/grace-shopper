/* eslint-disable max-statements */
'use strict'

const db = require('../server/db')
const {
  User,
  Product,
  Order,
  Review,
  Order_Product,
  Category,
} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = [
    {email: 'cody@email.com', password: '123'},
    {email: 'murphy@email.com', password: '123'},
  ]

  const products = [
    {
      title: 'Eucalyptus',
      description:
        'has healing properties, koalas eat it, poisonous to most other things',
      categoryId: 1,
      price: 29.99,
      inventoryQuantity: 20,
      imageUrl:
        'https://www.parasperfumers.com/upload/product_ecom/Eucalyptus-Radiata-Essential-Oil-ProductPic.jpg',
    },
    {
      title: 'Aloe Vera',
      description: 'good for sunburns, poisonous to cats',
      categoryId: 4,
      price: 3.5,
      inventoryQuantity: 50,
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSlzFimnp1eBL0y4FkFNUJgQnWrRh0i4QlDdnP_ZtdjG2FEGBRc&usqp=CAU',
    },
    {
      title: 'Oak Seedling',
      description: 'will grow into a big tree, produces acorns',
      categoryId: 1,
      price: 10.0,
      inventoryQuantity: 8,
    },
    {
      title: 'Tulip',
      description: 'pretty basic flower',
      categoryId: 2,
      price: 2.0,
      inventoryQuantity: 1, // someone has >1 of these in their cart
    },
    {
      title: 'Purple Passion Vine',
      description: 'fuzzy and purple',
      categoryId: 5,
      price: 9.5,
      inventoryQuantity: 23,
      imageUrl:
        'https://www.netclipart.com/pp/m/346-3467700_clip-art-purple-branch-purple-leaves-clip-art.png',
    },
  ]

  const categories = [
    {name: 'tree'},
    {name: 'flower'},
    {name: 'shrub'},
    {name: 'succulent'},
    {name: 'vine'},
  ]

  const orderProducts = [
    {orderId: 1, productId: 1, cartQuantity: 1, checkoutPrice: 19.99},
    {orderId: 1, productId: 2, cartQuantity: 2, checkoutPrice: 2.0},
    {orderId: 1, productId: 3, cartQuantity: 4, checkoutPrice: 3.5},
    {orderId: 1, productId: 4, cartQuantity: 1, checkoutPrice: 10.89},
    {orderId: 2, productId: 2, cartQuantity: 2}, // not checked out yet
    {orderId: 2, productId: 4, cartQuantity: 3}, // not checked out yet
    {orderId: 3, productId: 3, cartQuantity: 20, checkoutPrice: 9.99},
    {orderId: 4, productId: 4, cartQuantity: 3, checkoutPrice: 29.99},
    {orderId: 4, productId: 2, cartQuantity: 1, checkoutPrice: 10.0},
    {orderId: 5, productId: 5, cartQuantity: 1}, // not checked out yet
    // orderId: 6 has no items in the cart, so they have no rows in this table
  ]
  const reviews = [
    {
      description: 'Loved my aloe vera! 10/10 would recommend',
      userId: 1,
      productId: 2,
    },
    {description: 'I killed my purple passion vine', userId: 1, productId: 5},
    {
      description: "My oak tree isn't growing fast enough",
      userId: 2,
      productId: 3,
    },
    {description: 'Aloe vera tastes funny', userId: 2, productId: 2},
  ]


  const orders = [
    {status: 'processing', userId: 1},
    {status: 'created', userId: 1},
    {status: 'complete', userId: 1},
    {status: 'complete', userId: 2},
    {status: 'cancelled', userId: 1},
    {status: 'created', userId: 2}, // this order was created, but then the user deleted all items from their cart
  ]

  await User.bulkCreate(users)
  await Category.bulkCreate(categories)
  await Product.bulkCreate(products)
  await Order.bulkCreate(orders)
  await Order_Product.bulkCreate(orderProducts)
  await Review.bulkCreate(reviews)

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
