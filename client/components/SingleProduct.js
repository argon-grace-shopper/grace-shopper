import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/product'
import {createOrder, updateOrder} from '../store/currentOrder'
import {addToCart} from '../store/myCurrentOrder'
import Reviews from './Reviews'

class SingleProduct extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    try {
      const productId = this.props.match.params.id
      console.log('component did mount')
      this.props.getProduct(productId)
    } catch (error) {
      console.error(error)
    }
  }
  handleSubmit(e) {
    e.preventDefault()
    try {
      const product = {
        productId: this.props.match.params.id,
        cartQuantity: 1
      }
      console.log('event', e)
      // this.props.addToCart(product)
    } catch (err) {
      console.log(err)
    }
  }
  render() {
    const {product} = this.props.product
    console.log('product', product)
    console.log('review', this.props.product.reviews)
    return product ? (
      <div className="single-product">
        <div>
          <h3>{product.title}</h3>
          <h3> {product.price}</h3>
        </div>
        <p>{product.desciption}</p>
        <img src={product.imageUrl} />
        <button type="submit" onClick={this.handleSubmit}>
          Add to Cart
        </button>
        <Reviews productId={this.props.match.params.id} />
        {/* check if theres already an order add product id to order, if not create order, and add product id */}
      </div>
    ) : (
      <div>..Loading </div>
    )
  }
}
const mapState = state => {
  return {product: state.product, order: state.order}
}

const mapDispatch = dispatch => ({
  getProduct: id => dispatch(fetchSingleProduct(id)),
  updateOrder: id => dispatch(updateOrder(id)),
  createOrder: id => dispatch(createOrder(id))
})

export default connect(mapState, mapDispatch)(SingleProduct)
