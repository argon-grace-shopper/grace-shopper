import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import SingleProduct from './SingleProduct'
import {fetchProducts} from './products'

export class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getProducts()
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
          <ul>
            {categories.map(category => {
              return (
                <li key={category.id}>
                  {' '}
                  <a href={`/${category.name}`}>{category.name}</a>{' '}
                </li>
              )
            })}
          </ul>
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
    getProducts: () => dispatch(fetchProducts())
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
