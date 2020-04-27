import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {
  fetchMyCurrentOrder,
  deleteItemFromOrder,
  updateQtyInCart,
} from '../store/myCurrentOrder'
import {connect} from 'react-redux'
import {loadStripe} from '@stripe/stripe-js'
import axios from 'axios'

const stripePromise = loadStripe('pk_test_5MVbKAdVRzUv9UXxVVXWOiNM00zO1he2a0')
const mapToProps = (state) => ({
  createdOrder: state.createdOrder,
})

const dispatchToProps = (dispatch) => {
  return {
    getMyCurrentOrder: () => dispatch(fetchMyCurrentOrder()),
    deleteItemFromOrder: (order, product) =>
      dispatch(deleteItemFromOrder(order, product)),
    updateQtyInCart: (order, product) =>
      dispatch(updateQtyInCart(order, product)),
  }
}

export const Cart = (props) => {
  const [subTotal, setSubTotal] = useState()
  const [errorMessage, setErrorMessage] = useState()

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

  const stripeFormatOrderData = () => {
    const stripeOrderData = props.createdOrder[0].products.map((product) => {
      return {
        name: product.title,
        amount: product.price * 100,
        currency: 'usd',
        quantity: +product.order_product.cartQuantity,
      }
    })
    return stripeOrderData
  }

  const handleCheckoutClick = async () => {
    const stripe = await stripePromise
    const sessionId = await axios.post(
      '/stripe/create-checkout-session',
      stripeFormatOrderData()
    )
    const {error} = await stripe.redirectToCheckout({
      sessionId: sessionId.data,
    })
    if (error) {
      setErrorMessage(error.message)
    }
  }

  return (
    <div>
      <h2>Shopping Cart</h2>
      {!props.createdOrder.length ? (
        <h4> There is nothing in the cart</h4>
      ) : errorMessage ? (
        <div>{errorMessage}</div>
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
                <div>{product.inventoryQuantity} items in stock</div>
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
          <button type="button" role="link" onClick={handleCheckoutClick}>
            Checkout
          </button>
        </div>
      )}
    </div>
  )
}

export default connect(mapToProps, dispatchToProps)(Cart)
