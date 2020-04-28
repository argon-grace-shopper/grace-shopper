import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {ShoppingFilled} from '@ant-design/icons'
import {Badge} from 'antd'
import {fetchMyCurrentOrder} from '../store/myCurrentOrder'

export const Navbar = (props) => {
  const [cart, setCart] = useState()

  const cartCalc = () => {
    if (props.createdOrder.length > 0) {
      let total = 0
      props.createdOrder[0].products.forEach((product) => {
        total += product.order_product.cartQuantity
      })
      setCart(total)
    }
  }
  useEffect(() => {
    props.getMyCurrentOrder()
  }, [])

  useEffect(() => {
    cartCalc()
  }, [props.createdOrder])

  return (
    <div id="nav-container">
      <a href="/home">
        <h1>Plant Store</h1>
      </a>
      <nav>
        {props.isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/home">Home</Link>
            <Link to="/products">Products</Link>
            <a href="#" onClick={props.handleClick}>
              Logout
            </a>
            <a href="/cart">
              <Badge count={cart}>
                <ShoppingFilled style={{fontSize: '30px'}} />
              </Badge>
            </a>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
      </nav>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,

    createdOrder: state.createdOrder,
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout())
    },
    getMyCurrentOrder: (userId) => dispatch(fetchMyCurrentOrder(userId)),
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
}
