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
        if (props.createdOrder[0].id !== 'Guest Order') {
          props.saveCheckoutPrice(product, props.createdOrder[0].id)
        }
        props.updateInventoryQuantity(
          product.id,
          product.inventoryQuantity - product.order_product.cartQuantity
        )
      })
      if (props.createdOrder[0].id !== 'Guest Order') {
        props.updateOrderStatus(props.createdOrder[0].id)
      }
    }
  }, [props.createdOrder])

  return (
    <div className="success-page-container>">
      <h1 style={{textAlign: 'center', color: '#254d32'}}>
        Success! Your payment has been processed!
        <Link to="/products">
          <p style={{color: '#3AB795'}}>Continue shopping 🌿</p>
        </Link>
        <img src="https://i.gifer.com/2MSy.gif" />
      </h1>
    </div>
  )
}

export default connect(mapToProps, dispatchToProps)(Success)
