const User = require('./user')
const Product = require('./product')
const Order = require('./order')
const Review = require('./review')

User.hasMany(Order)
Order.belongsTo(User)
Review.belongsTo(User)
User.hasMany(Review)
Order.belongsToMany(Product, {through: 'Order_Product'})
Product.belongsToMany(Order, {through: 'Order_Product'})

Product.hasMany(Review)
Review.belongsTo(Product)

module.exports = {
  User
}
