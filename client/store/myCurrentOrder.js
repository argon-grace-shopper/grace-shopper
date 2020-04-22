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
      console.log(data)
    } catch (error) {
      console.error(error)
    }
  }
}

export const updateMyCurrentOrder = (order, product) => {
  return async dispatch => {
    try {
      await axios.put(`/api/cart/${order[0].user.id}`, product)
      const {data} = await axios.get(`/api/cart/${order[0].user.id}`)
      dispatch(setCreatedOrder(data))
      console.log('updated data', data)
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
