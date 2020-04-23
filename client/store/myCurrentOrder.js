import axios from 'axios'

const SET_CREATED_ORDER = 'GET_CREATED_ORDER'

const initialValue = []

const setCreatedOrder = createdOrder => {
  return {
    type: SET_CREATED_ORDER,
    createdOrder
  }
}

export const fetchMyCurrentOrder = userId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/cart/${userId}`)
      dispatch(setCreatedOrder(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const deleteItemFromOrder = (order, product) => {
  return async dispatch => {
    try {
      await axios.put(`/api/cart/remove-from-cart/${order[0].user.id}`, product)
      const {data} = await axios.get(`/api/cart/${order[0].user.id}`)
      dispatch(setCreatedOrder(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const updateQtyInCart = (order, product) => {
  return async dispatch => {
    try {
      await axios.put(`/api/cart/update-qty/${order[0].user.id}`, product)
      const {data} = await axios.get(`/api/cart/${order[0].user.id}`)
      dispatch(setCreatedOrder(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const addToCart = (order, product) => {
  return async dispatch => {
    try {
      await axios.post(`/api/cart/add-to-cart/${order[0].user.id}`, product)
      const {data} = await axios.get(`/api/cart/${order[0].user.id}`)
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
