import React from 'react'
// import {Menu, Dropdown} from 'antd'
// import {DownOutlined} from '@ant-design/icons'
import {menu} from './AdminDropdown'

export default class Admin extends React.Component {
  constructor(props) {
    super(props)
    this.handleMenuClick = this.handleMenuClick.bind(this)
  }
  handleMenuClick(e) {
    this.props.history.push(`/${e.target.value}`)
  }
  render() {
    return (
      <div className="all-products-container">
        <div className="sidebar">
          <h3>Admin Actions</h3>
          <select onChange={this.handleMenuClick} defaultValue={this.category}>
            <option value="admin/products">products</option>
            <option value="admin/users">users</option>
            <option value="admin/orders">orders</option>
          </select>
        </div>
        <div className="all-products-panel-container">
          <div>Admin Username</div>
          <button>Logout</button>
        </div>
      </div>
      // <div id="container">
      //   <Dropdown overlay={menu} trigger={['click']}>
      //     <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
      //       Admin Actions <DownOutlined />
      //     </a>
      //   </Dropdown>
      // </div>
    )
  }
}
