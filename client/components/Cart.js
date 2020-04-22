import React, {useEffect, useState} from 'react'
import {
  fetchMyCurrentOrder,
  updateMyCurrentOrder
} from '../store/myCurrentOrder'
import {connect} from 'react-redux'

const mapToProps = state => ({
  createdOrder: state.createdOrder
})

const dispatchToProps = dispatch => {
  return {
    getMyCurrentOrder: userId => dispatch(fetchMyCurrentOrder(userId)),
    updateMyCurrentOrder: (order, product) =>
      dispatch(updateMyCurrentOrder(order, product))
  }
}

export const Cart = props => {
  useEffect(() => {
    props.getMyCurrentOrder(props.match.params.userId)
  }, [])

  const handleDelete = product => {
    console.log({product})
    console.log('handle delete')
    props.updateMyCurrentOrder(props.createdOrder, product)
  }

  return (
    <div>
      <h2>Shopping Cart</h2>
      {!props.createdOrder.length ? (
        <h4> There is nothing in the cart</h4>
      ) : (
        <div>
          {props.createdOrder[0].products.map(product => (
            <div key={product.id}>
              <span>
                <img src={product.imageUrl} style={{width: 100, height: 100}} />
                <p>{product.title}</p>
                <label htmlFor="qty">Qty:</label>
                <select id="qty">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <p>${product.price}</p>
                <button type="button" onClick={() => handleDelete(product)}>
                  Remove
                </button>{' '}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default connect(mapToProps, dispatchToProps)(Cart)
