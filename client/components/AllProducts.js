import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchAllProducts} from '../store/products'
import {fetchCategories} from '../store/categories'

export class AllProducts extends React.Component {
  constructor() {
    super()
    this.category = 'all products'
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.props.getAllProducts()
    this.props.getCategories()
  }

  handleChange(event) {
    this.category = event.target.value
    this.props.getAllProducts()
  }

  render() {
    const products = this.props.products
    const categories = this.props.categories

    // console.log(campuses[0]);

    return (
      <div>
        <h2>ALL PRODUCTS</h2>

        {products ? (
          <div className="all-products-container">
            <div className="sidebar">
              <h3>Product Categories</h3>
              <select onChange={this.handleChange} defaultValue={this.category}>
                <option>all products</option>
                {categories.map(category => {
                  return <option key={category.id}>{category.name}</option>
                })}
              </select>
            </div>
            <div className="all-products-panel-container">
              {products.map(product => {
                if (
                  this.category === 'all products' ||
                  this.category === product.category.name
                ) {
                  return (
                    <div className="all-products-panel" key={product.id}>
                      <Link product={product} to={`/products/${product.id}`}>
                        <img src={product.imageUrl} />
                        <p>{product.title}</p>
                      </Link>
                      <small>{product.price}</small>
                    </div>
                  )
                }
              })}
            </div>
          </div>
        ) : (
          <h3>Loading...</h3>
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    products: state.products,
    categories: state.categories
  }
}

const mapDispatch = dispatch => {
  return {
    getAllProducts: () => dispatch(fetchAllProducts()),
    getCategories: () => dispatch(fetchCategories())
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
