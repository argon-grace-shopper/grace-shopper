import axios from 'axios'

const CREATE_ORDER = 'CREATE_ORDER'
const UPDATE_ORDER = 'UPDATE_ORDER'

export const createNewOrder = (order) => {
  return {
    type: CREATE_ORDER,
    order,
  }
}
export const updateOrder = (order) => {
  return {
    type: UPDATE_ORDER,
    order,
  }
}

export const updateExistingOrder = (id) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get(`/api/products/${id}`)
      dispatch(updateOrder(data))
    } catch (err) {
      console.log(err)
    }
  }
}
export const createOrder = (id) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get(`/api/products/${id}`)
      dispatch(createNewOrder(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export default function orderReducer(order = {}, action) {
  switch (action.type) {
    case CREATE_ORDER:
      return action.order
    case GET_SINGLE_PRODUCT:
      return action.order
    default:
      return order
  }
}
