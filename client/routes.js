import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup} from './components'
import UserHome from './components/user-home'
import SingleProduct from './components/SingleProduct'
import {me} from './store'
import Cart from './components/Cart'
import AllProducts from './components/allProducts'
import Reviews from './components/Reviews'
import AdminMain from './components/AdminMain'
import AdminProducts from './components/AdminProducts'
import AdminOrders from './components/AdminOrders'
import AdminUsers from './components/AdminUsers'
import Success from './components/Success'
import Canceled from './components/Canceled'
/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn, isAdmin} = this.props
    return (
      <Switch>
        {/* Routes placed here are available to all visitors  */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/products/:id" component={SingleProduct} />
        <Route exact path="/products/:productId/reviews" component={Reviews} />
        <Route path="/products" component={AllProducts} />{' '}
        <Route exact path="/cart" component={Cart} />
        <Route path="/success" component={Success} />
        <Route path="/canceled" component={Canceled} />
        <Route>
          <div style={{height: '300rm'}}>
            <h1 style={{textAlign: 'center', color: '#254d32'}}>
              We looked everywhere but couldn't find the page.
              <img src="https://iconbug.com/download/size/512/icon/1217/sad-seedling/" />
            </h1>
          </div>
        </Route>
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route exact path="/account" component={UserHome} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/admin" component={AdminMain} />
            <Route exact path="/admin/products" component={AdminProducts} />
            <Route exact path="/admin/users" component={AdminUsers} />
            <Route exact path="/admin/orders" component={AdminOrders} />
          </Switch>
        )}
        {/* {isAdmin && ( */}
        {/* Routes placed here are only available if you're an admin */}
        {/* )} */}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    isAdmin: !!state.user.isAdmin,
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me())
    },
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired,
}
