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
import {Button} from 'antd'

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
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {!props.createdOrder.length || !props.createdOrder[0].products.length ? (
        <div>
          <h3>The cart is empty</h3>
          <img src="https://iconbug.com/download/size/512/icon/1217/sad-seedling/" />
        </div>
      ) : errorMessage ? (
        <div>{errorMessage}</div>
      ) : (
        <div>
          {props.createdOrder[0].products.map((product) => (
            <div key={product.id} className="item">
              <div className="cart-item-container">
                <div className="image-stock-info">
                  <img
                    src={product.imageUrl}
                    style={{width: 150, height: 150}}
                  />
                </div>
                <div>
                  <Link to={`/products/${product.id}`}>
                    <h3>{product.title}</h3>
                  </Link>

                  <div>
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
                  </div>
                  <div>
                    <p>
                      $
                      {(
                        product.price * product.order_product.cartQuantity
                      ).toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <Button
                      type="primary"
                      onClick={() => handleDeleteFromCart(product)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
              {product.inventoryQuantity - product.order_product.cartQuantity <
                0 && (
                <div>
                  <div className="not-enough-stock">
                    Only {product.inventoryQuantity} item(s) left in stock
                  </div>
                  <div className="not-enough-stock">
                    Please adjust the qty or delete the item from cart
                  </div>
                </div>
              )}
            </div>
          ))}
          <div className="subtotal-checkout ">
            <div className="subtotal">Subtotal: ${subTotal}</div>
            <div>
              <Button
                type="primary"
                role="link"
                onClick={handleCheckoutClick}
                style={{backgroundColor: '#254D32', borderColor: '#254D32'}}
              >
                Checkout
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default connect(mapToProps, dispatchToProps)(Cart)
