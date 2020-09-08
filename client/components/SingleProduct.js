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

import {Layout, Card, Collapse, Button} from 'antd'

const {Panel} = Collapse
const {Header, Content, Footer} = Layout

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
    let currentProductInCart
    if (this.props.createdOrder.length) {
      currentProductInCart = _find(this.props.createdOrder[0].products, {
        id: +productId,
      })
    }
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
      <Layout>
        <Header id="header">
          <h1>{product.title}</h1>
        </Header>

        <Content>
          <div className="single-product">
            <Card>
              <div className="single-product-info">
                <img className="single-product-img" src={product.imageUrl} />
                <div>
                  <h3>{product.title}</h3>
                  <p> ${product.price}</p>
                  {!product.inventoryQuantity > 0 && (
                    <p style={{color: '#3ab795'}}>SOLD OUT!</p>
                  )}
                </div>
              </div>
              {product.inventoryQuantity > 0 ? (
                <Button
                  className="add-button"
                  type="primary"
                  onClick={this.handleAddToCartButtonClick}
                >
                  Add To Cart
                </Button>
              ) : (
                <Button
                  disabled
                  className="add-button"
                  type="primary"
                  onClick={this.handleAddToCartButtonClick}
                >
                  Add To Cart
                </Button>
              )}
            </Card>

            <Collapse defaultActiveKey={['1']}>
              <Panel header="Description" key="1">
                <p>{product.description}</p>
              </Panel>
              <Panel header="Reviews" key="2">
                <Reviews productId={this.props.match.params.id} />
              </Panel>
            </Collapse>
          </div>
        </Content>
        <Footer id="footer">Copyright © 2020 The Plant Store</Footer>
      </Layout>
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
