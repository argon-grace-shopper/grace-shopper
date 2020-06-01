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

export const saveCheckoutPrice = (product, orderId) => {
  return async () => {
    try {
      await axios.put(`/api/cart/save-checkout-price`, {
        product: product,
        orderId: orderId,
      })
    } catch (error) {
      console.error(error)
    }
  }
}

export const updateOrderStatus = (orderId) => {
  return async () => {
    try {
      await axios.put(`/api/cart/order-status-update`, {orderId})
    } catch (error) {
      console.error(error)
    }
  }
}

export const changeOrderStatus = (orderId, status) => {
  return async () => {
    try {
      await axios.put(`/api/cart/order-status-change`, {
        orderId: orderId,
        status: status,
      })
    } catch (error) {
      console.error(error)
    }
  }
}

export const updateInventoryQuantity = (productId, newInventoryQuantity) => {
  return async () => {
    try {
      await axios.put('/api/cart/update-product-inventory', {
        productId: productId,
        newInventoryQuantity: newInventoryQuantity,
      })
    } catch (err) {
      console.error(err)
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
