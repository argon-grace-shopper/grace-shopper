import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import {Layout, Table, Button, Tabs} from 'antd'
import {fetchMyOrders} from '../store'
import {ProfileFilled, SettingFilled} from '@ant-design/icons'

const {Header, Content, Footer} = Layout
const {TabPane} = Tabs

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
    if (props.myOrders) {
      let table = []
      props.myOrders.forEach((order) => {
        if (order.status !== 'created') {
          table.push({
            key: order.id,
            status: order.status,
            date: order.updatedAt.slice(0, 10),
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
            items: order.products
              .map((product) => product.order_product.cartQuantity)
              .reduce((accum, currVal) => accum + currVal),
          })
        }
      })

      setData(table)
    }
  }

  useEffect(() => {
    props.getMyOrders()
  }, [])

  useEffect(() => {
    dataCalc()
  }, [props.myOrders])

  return (
    <div className="center">
      <Layout>
        <Header id="header">
          <h2>Your Account</h2>
        </Header>
        <Content id="content">
          <Tabs defaultActiveKey="1">
            <TabPane
              tab={
                <span>
                  <SettingFilled />
                  Settings
                </span>
              }
              key="1"
            >
              <h3>Hi, {email}! </h3>
              <Button type="primary">Sign Out</Button>
            </TabPane>
            <TabPane
              tab={
                <span>
                  <ProfileFilled />
                  Past Orders
                </span>
              }
              key="2"
            >
              <Table dataSource={tableData} columns={columns} />
            </TabPane>
          </Tabs>
        </Content>
        <Footer id="footer">Copyright © 2020 Plant Store</Footer>
      </Layout>
    </div>
  )
}

const mapState = (state) => {
  return {
    email: state.user.email,
    myOrders: state.user.myOrders,
  }
}

const mapDispatch = (dispatch) => ({
  getMyOrders: () => dispatch(fetchMyOrders()),
})

export default connect(mapState, mapDispatch)(UserHome)

UserHome.propTypes = {
  email: PropTypes.string,
}
