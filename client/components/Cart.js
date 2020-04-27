import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {
  fetchMyCurrentOrder,
  deleteItemFromOrder,
  updateQtyInCart,
} from '../store/myCurrentOrder'
import {connect} from 'react-redux'

const mapToProps = (state) => ({
  createdOrder: state.createdOrder,
})

const dispatchToProps = (dispatch) => {
  return {
    getMyCurrentOrder: (userId) => dispatch(fetchMyCurrentOrder(userId)),
    deleteItemFromOrder: (order, product) =>
      dispatch(deleteItemFromOrder(order, product)),
    updateQtyInCart: (order, product) =>
      dispatch(updateQtyInCart(order, product)),
  }
}

export const Cart = (props) => {
  const [subTotal, setSubTotal] = useState()

  const subtotalCalc = () => {
    if (props.createdOrder.length > 0) {
      let total = 0
      props.createdOrder[0].products.forEach((product) => {
        total += product.price * product.order_product.cartQuantity
      })
      setSubTotal(total.toFixed(2))
    }
  }
  useEffect(() => {
    props.getMyCurrentOrder()
  }, [])

  useEffect(() => {
    subtotalCalc()
  }, [props.createdOrder])

  const handleDeleteFromCart = (product) => {
    props.deleteItemFromOrder(product)
  }

  const handleChangeQty = (event, product) => {
    product.order_product.cartQuantity = event.target.value
    props.updateQtyInCart(product)
  }

  return (
    <div>
      <h2>Shopping Cart</h2>
      {!props.createdOrder.length ? (
        <h4> There is nothing in the cart</h4>
      ) : (
        <div>
          {props.createdOrder[0].products.map((product) => (
            <div key={product.id}>
              <span>
                <Link to={`/products/${product.id}`}>
                  <img
                    src={product.imageUrl}
                    style={{width: 100, height: 100}}
                  />
                  <p>{product.title}</p>
                </Link>
                <label htmlFor="qty">Qty:</label>
                <select
                  id="qty"
                  defaultValue={product.order_product.cartQuantity}
                  onChange={(e) => handleChangeQty(e, product)}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <p>
                  $
                  {(product.price * product.order_product.cartQuantity).toFixed(
                    2
                  )}
                </p>
                <button
                  type="button"
                  onClick={() => handleDeleteFromCart(product)}
                >
                  Remove
                </button>{' '}
              </span>
            </div>
          ))}
          <div>Subtotal: ${subTotal}</div>
          <button type="button">Checkout</button>
        </div>
      )}
    </div>
  )
}

export default connect(mapToProps, dispatchToProps)(Cart)
