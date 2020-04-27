import React from 'react'
import {fetchAllProducts} from '../store/products'
import {connect} from 'react-redux'
class AdminProducts extends React.Component {
  constructor(props) {
    super(props)
    this.selectproduct = this.selectProduct.bind(this)
  }
  componentDidMount() {
    this.props.getAllProducts()
  }
  selectProduct(e) {
    console.log('looking for selected', e.target)
    singleProduct = e.target.value
  }
  render() {
    let singleProduct
    const products = this.props.products
    return (
      <div>
        <div className="sidebar">
          <h3>Edit Products</h3>
          <select onChange={this.selectProduct}>
            {products.map((product) => (
              <option key={product.id} value={product}>
                {product.title}
              </option>
            ))}
          </select>
        </div>
        {singleProduct ? (
          <div className="single-product">
            <div>
              <h3>{singleProduct.title}</h3>
              <h3> {singleProduct.price}</h3>
            </div>
            <p>{singleProduct.desciption}</p>
            <img
              src={singleProduct.imageUrl}
              style={{width: 300, height: 300}}
            />
          </div>
        ) : (
          <div> No product selected</div>
        )}
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    products: state.products,
  }
}

const mapDispatch = (dispatch) => ({
  getAllProducts: () => dispatch(fetchAllProducts()),
})

export default connect(mapState, mapDispatch)(AdminProducts)
