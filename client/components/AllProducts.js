import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchAllProducts} from '../store/products'
import {fetchCategories} from '../store/categories'

import {Layout, Card, Menu, Pagination} from 'antd'
const {Header, Footer, Sider, Content} = Layout
const {SubMenu} = Menu

export class AllProducts extends React.Component {
  constructor() {
    super()
    this.category = 0
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.props.getAllProducts()
    this.props.getCategories()
  }

  handleChange(event) {
    this.category = Number(event.key)
    this.props.getAllProducts()
  }

  render() {
    const products = this.props.products
    const categories = this.props.categories

    return (
      <Layout>
        <Header id="header">
          <h1>All Plants</h1>
        </Header>
        <Layout>
          <Sider id="sidebar">
            {products ? (
              <Menu
                onClick={this.handleChange}
                defaultSelectedKeys={[`${this.category}`]}
                defaultOpenKeys={['sub1']}
                mode="inline"
              >
                <SubMenu
                  key="sub1"
                  title={
                    <span>
                      <span>Plants</span>
                    </span>
                  }
                >
                  <Menu.ItemGroup key="g1">
                    <Menu.Item key="0">all plant types</Menu.Item>
                    {categories.map((category) => {
                      return (
                        <Menu.Item key={category.id}>{category.name}</Menu.Item>
                      )
                    })}
                  </Menu.ItemGroup>
                </SubMenu>
              </Menu>
            ) : (
              <h3>Loading...</h3>
            )}
          </Sider>
          <Content id="content">
            <div className="all-products-panel-container">
              {products ? (
                products.map((product) => {
                  if (
                    this.category === 0 ||
                    this.category === product.categoryId
                  ) {
                    return (
                      <Card className="all-products-panel" key={product.id}>
                        <Link product={product} to={`/products/${product.id}`}>
                          <img src={product.imageUrl} />
                          <p>{product.title}</p>
                        </Link>
                        <small>$ {product.price}</small>
                      </Card>
                    )
                  }
                })
              ) : (
                <h3>Loading...</h3>
              )}
            </div>

            <Pagination className="center" defaultCurrent={1} total={5} />
          </Content>
        </Layout>
        <Footer id="footer"></Footer>
      </Layout>
    )
  }
}

const mapState = (state) => {
  return {
    products: state.products,
    categories: state.categories,
  }
}

const mapDispatch = (dispatch) => {
  return {
    getAllProducts: () => dispatch(fetchAllProducts()),
    getCategories: () => dispatch(fetchCategories()),
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
