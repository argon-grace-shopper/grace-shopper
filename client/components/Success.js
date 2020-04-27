import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {
  fetchMyCurrentOrder,
  saveCheckoutPrice,
  updateOrderStatus,
  updateInventoryQuantity,
} from '../store/myCurrentOrder'

import {connect} from 'react-redux'

const mapToProps = (state) => ({
  createdOrder: state.createdOrder,
})

const dispatchToProps = (dispatch) => {
  return {
    getMyCurrentOrder: () => dispatch(fetchMyCurrentOrder()),
    saveCheckoutPrice: (product, orderId) =>
      dispatch(saveCheckoutPrice(product, orderId)),
    updateOrderStatus: (orderId) => dispatch(updateOrderStatus(orderId)),
    updateInventoryQuantity: (productId, newInventoryQuantity) =>
      dispatch(updateInventoryQuantity(productId, newInventoryQuantity)),
  }
}
const Success = (props) => {
  useEffect(() => {
    props.getMyCurrentOrder()
  }, [])

  useEffect(() => {
    if (props.createdOrder.length) {
      props.createdOrder[0].products.forEach((product) => {
        props.saveCheckoutPrice(product, props.createdOrder[0].id)
        props.updateInventoryQuantity(
          product.id,
          product.inventoryQuantity - product.order_product.cartQuantity
        )
      })
      props.updateOrderStatus(props.createdOrder[0].id)
    }
  }, [props.createdOrder])

  return (
    <div>
      <h1>Success! Your payment has been processed!</h1>
      <Link to="/products">Continue shopping</Link>
    </div>
  )
}

export default connect(mapToProps, dispatchToProps)(Success)
