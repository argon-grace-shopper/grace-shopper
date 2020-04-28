import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/product'
import {createOrder, updateOrder} from '../store/currentOrder'
import {
  fetchMyCurrentOrder,
  addToCart,
  updateQtyInCart,
} from '../store/myCurrentOrder'

import Reviews from './Reviews'
import _find from 'lodash/find'

class SingleProduct extends React.Component {
  constructor(props) {
    super(props)
    this.handleAddToCartButtonClick = this.handleAddToCartButtonClick.bind(this)
  }
  componentDidMount() {
    try {
      const productId = this.props.match.params.id
      this.props.getProduct(productId)
      this.props.fetchOrder()
    } catch (error) {
      console.error(error)
    }
  }

  handleAddToCartButtonClick() {
    const productId = this.props.match.params.id
    const currentProductInCart = _find(this.props.createdOrder[0].products, {
      id: +productId,
    })
    if (currentProductInCart) {
      currentProductInCart.order_product.cartQuantity++
      this.props.updateQtyInCart(currentProductInCart)
    } else {
      this.props.addToCart(this.props.product)
    }
  }

  render() {
    const {product} = this.props.product
    return product ? (
      <div className="single-product">
        <div>
          <h3>{product.title}</h3>
          <h3> {product.price}</h3>
        </div>
        <p>{product.desciption}</p>
        <img src={product.imageUrl} style={{width: 300, height: 300}} />
        <Reviews productId={this.props.match.params.id} />
        <button type="button" onClick={this.handleAddToCartButtonClick}>
          Add To Cart
        </button>
      </div>
    ) : (
      <div>...Loading </div>
    )
  }
}
const mapState = (state) => {
  return {
    product: state.product,
    order: state.order,
    createdOrder: state.createdOrder,
  }
}

const mapDispatch = (dispatch) => ({
  getProduct: (id) => dispatch(fetchSingleProduct(id)),
  updateOrder: (id) => dispatch(updateOrder(id)),
  createOrder: (id) => dispatch(createOrder(id)),
  fetchOrder: () => dispatch(fetchMyCurrentOrder()),
  addToCart: (product) => dispatch(addToCart(product)),
  updateQtyInCart: (product) => dispatch(updateQtyInCart(product)),
})

export default connect(mapState, mapDispatch)(SingleProduct)
