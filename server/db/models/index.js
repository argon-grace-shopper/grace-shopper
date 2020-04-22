const User = require('./user')
const Product = require('./product')
const Order = require('./order')
const Review = require('./review')
const Order_Product = require('./order_product')
const Category = require('./category')

Order.belongsTo(User)
User.hasMany(Order)

Review.belongsTo(User)
User.hasMany(Review)

Order.belongsToMany(Product, {through: Order_Product})
Product.belongsToMany(Order, {through: Order_Product})

Review.belongsTo(Product)
Product.hasMany(Review)

Product.belongsTo(Category)
Category.hasMany(Product)

module.exports = {
  User,
  Product,
  Order,
  Review,
  Order_Product,
  Category
}
