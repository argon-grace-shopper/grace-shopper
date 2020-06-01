import React from 'react'
import {fetchAllProducts} from '../store/products'
import {
  fetchSingleProduct,
  fetchUpdateProduct,
  deleteProduct,
} from '../store/product'
import {connect} from 'react-redux'
import {Layout, Card, Button, Form, Input} from 'antd'
const layout = {
  labelCol: {span: 8},
  wrapperCol: {span: 16},
}
const {Header, Content} = Layout

class AdminProducts extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.onFinish = this.onFinish.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount() {
    this.props.getAllProducts()
  }

  handleChange(e) {
    e.preventDefault()
    let id = e.target.value
    this.props.getSingleProduct(id)
  }

  onFinish(values) {
    let title = values.product.title
    let price = values.product.price
    let species = values.product.species
    let description = values.product.description
    let id = this.props.product.product.id
    let product = {id, title, price, species, description}
    for (let keys in product) {
      if (product[keys] === '') {
        product[keys] = this.props.product.product.keys
      }
    }
    this.props.getUpdatedProduct(product)
  }

  handleDelete(e) {
    e.preventDefault()
    let id = e.target.value
    this.props.deleteSingleProduct(id)
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
          <Layout>
            <Header id="header">
              <h1>{this.props.product.product.title}</h1>
            </Header>
            <Content>
              <div className="single-product">
                <Card>
                  <h3> {this.props.product.product.price}</h3>
                  <p>{this.props.product.product.description}</p>
                  <img
                    src={this.props.product.product.imageUrl}
                    style={{width: 300, height: 300}}
                  />
                  <h3>Delete Plant</h3>
                  <Button
                    className="add-button"
                    type="primary"
                    value={this.props.product.product.id}
                    onClick={this.handleDelete}
                  >
                    Delete
                  </Button>
                  <Form
                    {...layout}
                    name="nest-messages"
                    onFinish={this.onFinish}
                  >
                    <div className="form">
                      <h3> Edit Plant</h3>
                      <Form.Item name={['product', 'title']} label="title">
                        <Input />
                      </Form.Item>
                      <Form.Item name={['product', 'price']} label="price">
                        <Input />
                      </Form.Item>
                      <Form.Item name={['product', 'species']} label="species">
                        <Input />
                      </Form.Item>
                      <Form.Item
                        name={['product', 'description']}
                        label="description"
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item wrapperCol={{...layout.wrapperCol, offset: 8}}>
                        <Button type="primary" htmlType="submit">
                          Submit edit
                        </Button>
                      </Form.Item>
                    </div>
                  </Form>
                </Card>
              </div>
            </Content>
          </Layout>
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
  deleteSingleProduct: (id) => dispatch(deleteProduct(id)),
})

export default connect(mapState, mapDispatch)(AdminProducts)
