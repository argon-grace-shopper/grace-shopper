import axios from 'axios'

const SET_ALL_ORDERS = 'SET_ALL_ORDERS'

export const setAllOrders = (orders) => {
  return {
    type: SET_ALL_ORDERS,
    orders,
  }
}

export const fetchAllOrders = () => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get('/api/orders')
      dispatch(setAllOrders(data))
    } catch (err) {
      console.log(err)
    }
  }
}

const initialState = []

// Take a look at app/redux/index.js to see where this reducer is
// added to the Redux store with combineReducers
export default function ordersReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ALL_ORDERS:
      return action.orders
    default:
      return state
  }
}
