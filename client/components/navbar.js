import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {ShoppingFilled, SettingFilled} from '@ant-design/icons'
import {Badge, Popover, Button} from 'antd'
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

  const content = props.isLoggedIn ? (
    <div>
      {props.isAdmin.isAdmin && (
        <a href="/admin">
          <p>Admin Dashboard</p>
        </a>
      )}
      <a href="/account">
        <p>Your Account</p>
      </a>
      <a href="#" onClick={props.handleClick}>
        <p>Log Out</p>
      </a>
    </div>
  ) : (
    <div>
      <Link to="/login">
        <p>Log In</p>
      </Link>
      <Link to="/signup">
        <p>Sign Up</p>
      </Link>
    </div>
  )

  return (
    <div id="nav-container">
      <a href="/home">
        <p className="logo">the plant store</p>
      </a>
      <nav>
        <div className="nav">
          <Link to="/products">
            <Button>Shop Now</Button>
          </Link>

          <div>
            <Popover placement="bottomRight" content={content}>
              <a>
                <SettingFilled style={{fontSize: '30px'}} />
              </a>
            </Popover>

            <a href="/cart">
              <Badge count={cart}>
                <ShoppingFilled style={{fontSize: '30px'}} />
              </Badge>
            </a>
          </div>
        </div>
      </nav>
    </div>
  )
}

const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: state.user,

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

Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
}
