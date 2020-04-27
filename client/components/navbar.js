import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {ShoppingFilled} from '@ant-design/icons'
import {Badge} from 'antd'
import {fetchMyCurrentOrder} from '../store/myCurrentOrder'

export class Navbar extends React.Component {
  constructor() {
    super()
    this.cart = 0
  }

  componentDidMount() {
    this.props.getMyCurrentOrder(1)
  }

  render() {
    if (this.props.createdOrder > 0) {
      this.props.createdOrder.products.forEach((product) => {
        this.cart += product.order_product.cartQuantity
      })
    }

    console.log(this.props, this.cart)

    return (
      <div>
        <h1>Plant Store</h1>
        <nav>
          {this.props.isLoggedIn ? (
            <div>
              {/* The navbar will show these links after you log in */}
              <Link to="/home">Home</Link>
              <a href="#" onClick={this.props.handleClick}>
                Logout
              </a>
              <Badge count={this.cart}>
                <ShoppingFilled style={{fontSize: '30px'}} />
              </Badge>
            </div>
          ) : (
            <div>
              {/* The navbar will show these links before you log in */}
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </div>
          )}
        </nav>
        <hr />
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
    createdOrder: state.createdOrder[0],
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
