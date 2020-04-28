import React from 'react'
import {fetchAllProducts} from '../store/products'
import {fetchSingleProduct, fetchUpdateProduct} from '../store/product'
import {connect} from 'react-redux'
class AdminProducts extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    this.props.getAllProducts()
  }
  handleChange(e) {
    e.preventDefault()
    let id = e.target.value
    this.props.getSingleProduct(id)
  }
  handleSubmit(e) {
    e.preventDefault()
    let title = e.target.title.value
    let price = e.target.price.value
    let species = e.target.species.value
    let description = e.target.description.value
    let id = this.props.product.product.id
    let product = {id, title, price, species, description}
    for (let keys in product) {
      if (product[keys] === '') {
        product[keys] = this.props.product.product.keys
      }
    }
    this.props.getUpdatedProduct(product)
  }
  render() {
    const products = this.props.products
    return (
      <div>
        <div className="sidebar">
          <h3>Edit Products</h3>
          <select onChange={(e) => this.handleChange(e)}>
            <option>Select</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.title}
              </option>
            ))}
          </select>
        </div>
        {this.props.product.product ? (
          <div>
            <div>
              <h3>{this.props.product.product.title}</h3>
              <h3> {this.props.product.product.price}</h3>
            </div>
            <p>{this.props.product.product.description}</p>
            <img
              src={this.props.product.product.imageUrl}
              style={{width: 300, height: 300}}
            />

            <form method="post" id="edit-product" onSubmit={this.handleSubmit}>
              <div className="form">
                <h3> Edit Plant</h3>
                <input
                  className="form-control"
                  type="text"
                  name="title"
                  placeholder="Enter new plant name"
                />
                <input
                  className="form-control"
                  type="text"
                  name="price"
                  placeholder="Enter new plant price"
                />
                <br />
                <input
                  className="form-control"
                  type="text"
                  name="species"
                  placeholder="Enter new species"
                />
                <br />
                <input
                  className="form-control"
                  type="text"
                  name="description"
                  placeholder="Enter new plant description"
                />
                <span className="input-group-btn">
                  <button className="btn btn-default" type="submit">
                    Submit edit
                  </button>
                </span>
              </div>
            </form>
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
    product: state.product,
  }
}

const mapDispatch = (dispatch) => ({
  getAllProducts: () => dispatch(fetchAllProducts()),
  getSingleProduct: (id) => dispatch(fetchSingleProduct(id)),
  getUpdatedProduct: (product) => dispatch(fetchUpdateProduct(product)),
})

export default connect(mapState, mapDispatch)(AdminProducts)
