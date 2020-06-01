import axios from 'axios'

const SET_ALL_PRODUCTS = 'SET_ALL_PRODUCTS'

export const setAllProducts = (products) => {
  return {
    type: SET_ALL_PRODUCTS,
    products,
  }
}

export const fetchAllProducts = () => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get('/api/products')
      dispatch(setAllProducts(data))
    } catch (err) {
      console.log(err)
    }
  }
}

const initialState = []

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ALL_PRODUCTS:
      return action.products
    default:
      return state
  }
}
