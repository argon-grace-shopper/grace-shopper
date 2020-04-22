import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import SingleProduct from './SingleProduct'
import {fetchAllProducts} from './products'

export class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getAllProducts()
  }

  render() {
    const products = this.props.products
    const categories = this.props.products

    // console.log(campuses[0]);

    return (
      <div>
        <h2>ALL PRODUCTS</h2>
        <div className="sidebar">
          <h3>Product Categories</h3>
          <select>
            {categories.map(category => {
              return <option key={category.id}>{category.name}</option>
            })}
          </select>
        </div>
        <div className="all-products-container">
          {products.map(product => {
            return (
              <div key={product.id}>
                <a onClick={() => this.handleClick(product.id)}>
                  <img src={product.imageUrl} />
                  <p>{product.title}</p>
                </a>
                <small>{product.price}</small>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    products: state.products
  }
}

const mapDispatch = dispatch => {
  return {
    getAllProducts: () => dispatch(fetchAllProducts())
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
