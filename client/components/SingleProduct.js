import React from 'react'
import {connect} from 'react-redux'
import productReducer, {fetchSingleProduct} from '../store/product'
import orderReducer, {createOrder, updateOrder} from '../store/currentOrder'

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
      const productId = this.props.match.params.id
      this.props.updateOrder(productId)
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
        {product.reviews ? (
          <p>reviews</p>
        ) : (
          <p>Be the first to review this product!</p>
        )}
        {/* check if theres already an order add product id to order, if not create order, and add product id */}
        <button onClick={this.handleSubmit}>Buy</button>
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
