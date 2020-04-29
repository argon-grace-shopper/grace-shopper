import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import productReducer from './product'
import productsReducer from './products'
import categoriesReducer from './categories'
import createdOrderReducer from './myCurrentOrder'
import reviewsReducer from './reviews'
import ordersReducer from './orders'

const reducer = combineReducers({
  user,
  products: productsReducer,
  categories: categoriesReducer,
  createdOrder: createdOrderReducer,
  product: productReducer,
  reviews: reviewsReducer,
  orders: ordersReducer,
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
