import axios from 'axios'
import history from '../history'

const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const SET_MY_PRODUCTS = 'SET_MY_PRODUCTS'
const SET_MY_ORDERS = 'SET_MY_ORDERS'

const defaultUser = {}

const getUser = (user) => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const setMyProducts = (myProducts) => ({type: SET_MY_PRODUCTS, myProducts})
const setMyOrders = (myOrders) => ({type: SET_MY_ORDERS, myOrders})

export const fetchMyProducts = () => async (dispatch) => {
  try {
    const {data} = await axios.get('/api/user/completeOrders')
    const productArr = []

    data.forEach((order) => {
      order.products.forEach((product) => {
        if (!productArr.includes(product.id)) {
          productArr.push(product.id)
        }
      })
    })
    console.log('my products', productArr)

    dispatch(setMyProducts(productArr))
  } catch (err) {
    console.error(err)
  }
}

export const fetchMyOrders = () => async (dispatch) => {
  try {
    const {data} = await axios.get('/api/user/allOrders')
    dispatch(setMyOrders(data))
  } catch (err) {
    console.error(err)
  }
}

export const me = () => async (dispatch) => {
  try {
    const res = await axios.get('/auth/me')
    console.log('res.data', res.data)
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async (dispatch) => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async (dispatch) => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    case SET_MY_PRODUCTS:
      return {...state, myProducts: action.myProducts}
    case SET_MY_ORDERS:
      return {...state, myOrders: action.myOrders}
    default:
      return state
  }
}
