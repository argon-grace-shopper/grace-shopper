import React, {useEffect, useState} from 'react'
import {fetchMyCurrentOrder} from '../store/myCurrentOrder'
import {connect} from 'react-redux'

const mapToProps = state => ({
  createdOrder: state.createdOrder
})

const dispatchToProps = dispatch => {
  return {
    getMyCurrentOrder: userId => dispatch(fetchMyCurrentOrder(userId))
  }
}

export const Cart = props => {
  useEffect(() => {
    props.getMyCurrentOrder(props.match.params.userId)
  }, [])

  return (
    <div>
      <h2>Shopping Cart</h2>
      {!props.createdOrder.length ? (
        <h4> There is nothing in the cart</h4>
      ) : (
        <div>
          {props.createdOrder[0].products.map(product => (
            <span key={product.id}>
              <img src={product.imageUrl} style={{width: 100, height: 100}} />
              <p>{product.title}</p>
              <p>{product.price}</p>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

export default connect(mapToProps, dispatchToProps)(Cart)
