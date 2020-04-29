import React from 'react'
import {connect} from 'react-redux'
import {fetchAllOrders} from '../store/orders'
import {changeOrderStatus} from '../store/myCurrentOrder'

import {Table, Button} from 'antd'

class AdminOrders extends React.Component {
  constructor(props) {
    super(props)
    this.dataCalc = this.dataCalc.bind(this)
    this.handleCancelClick = this.handleCancelClick.bind(this)
    this.handleProcessClick = this.handleProcessClick.bind(this)
    this.tableData = []
    this.dataFlag = false
  }

  handleCancelClick = (id) => {
    this.props.updateOrderStatus(id, 'cancelled')
    this.props.fetchAllOrders()
  }

  handleProcessClick = (id) => {
    this.props.updateOrderStatus(id, 'complete')
    this.props.fetchAllOrders()
  }

  dataCalc() {
    this.props.orders.forEach((order) => {
      if (order.status !== 'created') {
        this.tableData.push({
          key: order.id,
          email: order.user.email,
          status: order.status,
          date: order.updatedAt.slice(0, 10),
          items: order.products
            .map((product) => product.order_product.cartQuantity)
            .reduce((accum, currVal) => accum + currVal),
          total:
            '$ ' +
            Number.parseFloat(
              order.products
                .map(
                  (product) =>
                    product.order_product.cartQuantity *
                    Number(product.order_product.checkoutPrice)
                )
                .reduce((accum, currVal) => accum + currVal)
            ).toFixed(2),
        })
      }
    })
  }

  componentDidMount() {
    this.props.fetchAllOrders()
  }

  render() {
    const columns = [
      {
        title: 'User',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
      },
      {
        title: 'Items',
        dataIndex: 'items',
        key: 'items',
      },
      {
        title: 'Total',
        dataIndex: 'total',
        key: 'total',
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
      },
      {
        title: 'Process',
        key: 'process',
        render: (record) => (
          <span>
            {record.status === 'processing' ? (
              <Button onClick={() => this.handleProcessClick(record.key)}>
                Process
              </Button>
            ) : (
              <Button type="Primary" disabled>
                Process
              </Button>
            )}
          </span>
        ),
      },
      {
        title: 'Cancel',
        key: 'cancel',
        render: (record) => (
          <span>
            {record.status === 'cancelled' ? (
              <Button type="Primary" disabled>
                Cancel
              </Button>
            ) : (
              <Button danger onClick={() => this.handleCancelClick(record.key)}>
                Cancel
              </Button>
            )}
          </span>
        ),
      },
    ]

    if (this.props.orders.length > 0) {
      this.dataCalc()
    }

    if (this.props.orders && this.tableData.length > 0) {
      this.dataFlag = true
    }

    console.log(this.props.createdOrder)
    return (
      <div>
        <h1>ORDERS</h1>
        {this.dataFlag && (
          <Table dataSource={this.tableData} columns={columns} />
        )}
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    orders: state.orders,
    createdOrder: state.createdOrder,
  }
}

const mapDispatch = (dispatch) => ({
  fetchAllOrders: () => dispatch(fetchAllOrders()),
  updateOrderStatus: (orderId, status) =>
    dispatch(changeOrderStatus(orderId, status)),
})

export default connect(mapState, mapDispatch)(AdminOrders)
