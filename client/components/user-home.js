import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import {Layout, Table, Button} from 'antd'
import {fetchMyOrders} from '../store'

const {Header, Content, Footer} = Layout

/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const [tableData, setData] = useState()
  const {email} = props

  const columns = [
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
    },
    {
      title: 'Items',
      dataIndex: 'items',
      key: 'items',
    },
  ]

  const dataCalc = () => {
    if (props.myOrders > 0) {
      let table = []
      props.myOrders.forEach((order) => {
        if (order.status !== 'created') {
          table.push({
            Key: order.id,
            Status: order.status,
            Date: order.updatedAt,
            Total: order.products
              .map((product) => product.order_product.cartQuantity)
              .reduce((accum, currVal) => accum + currVal),
            Items: 2,
          })
        }
      })
      setData(tableData)
    }
  }

  useEffect(() => {
    props.getMyOrders()
  }, [])

  useEffect(() => {
    dataCalc()
  }, [props.myOrders])

  const dataSource = [
    {
      key: '1',
      status: 'Processed',
      date: 'July 4',
      total: 100,
      items: 2,
    },
    {
      key: '2',
      status: 'Processed',
      date: 'July 4',
      total: 100,
      items: 2,
    },
    {
      key: '3',
      status: 'Processed',
      date: 'July 4',
      total: 100,
      items: 2,
    },
  ]

  return (
    <div className="center">
      <Layout>
        <Header id="header">
          <h2>MY ACCOUNT</h2>
        </Header>
        <Content>
          <h3>Welcome, {email}</h3>
          <Button type="primary">Sign Out</Button>
          <Table dataSource={dataSource} columns={columns} />
        </Content>
        <Footer id="footer"></Footer>
      </Layout>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    email: state.user.email,
    myOrders: state.myOrders,
  }
}

const mapDispatch = (dispatch) => ({
  getMyOrders: () => dispatch(fetchMyOrders()),
})

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string,
}
