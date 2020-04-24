import axios from 'axios'

const SET_CREATED_ORDER = 'GET_CREATED_ORDER'

const initialValue = []

const setCreatedOrder = (createdOrder) => {
  return {
    type: SET_CREATED_ORDER,
    createdOrder,
  }
}

export const fetchMyCurrentOrder = () => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get(`/api/cart`)
      console.log(data)
      dispatch(setCreatedOrder(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const deleteItemFromOrder = (product) => {
  return async (dispatch) => {
    try {
      await axios.put(`/api/cart/remove-from-cart/`, product)
      const {data} = await axios.get(`/api/cart/`)
      dispatch(setCreatedOrder(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const updateQtyInCart = (product) => {
  return async (dispatch) => {
    try {
      await axios.put(`/api/cart/update-qty/`, product)
      const {data} = await axios.get(`/api/cart/`)
      dispatch(setCreatedOrder(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const addToCart = (product) => {
  return async (dispatch) => {
    try {
      await axios.post(`/api/cart/add-to-cart/`, product)
      const {data} = await axios.get(`/api/cart/`)
      dispatch(setCreatedOrder(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export default function createdOrderReducer(state = initialValue, action) {
  switch (action.type) {
    case SET_CREATED_ORDER:
      return action.createdOrder
    default:
      return state
  }
}
