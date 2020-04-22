import axios from 'axios'

const SET_ALL_PRODUCTS = 'SET_ALL_PRODUCTS'

export const setAllProducts = products => {
  return {
    type: SET_ALL_PRODUCTS,
    products
  }
}

export const fetchAllProducts = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/products')
      dispatch(setAllProducts(data))
    } catch (err) {
      console.log(err)
    }
  }
}

const initialState = []

// Take a look at app/redux/index.js to see where this reducer is
// added to the Redux store with combineReducers
export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ALL_PRODUCTS:
      return action.products
    default:
      return state
  }
}
