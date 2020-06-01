import React from 'react'
import ReactDOM from 'react-dom'

import {Menu, Dropdown} from 'antd'
import {DownOutlined, ConsoleSqlOutlined} from '@ant-design/icons'

export const menu = (props) => {
  return (
    <Menu>
      <Menu.Item key="0" value="admin/products" onClick={handleMenuClick}>
        <div>products</div>
      </Menu.Item>
      <Menu.Item key="1" onClick={handleMenuClick}>
        <div value="admin/users">users</div>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2" onClick={handleMenuClick}>
        <div value="admin/orders">orders</div>
      </Menu.Item>
    </Menu>
  )
}
