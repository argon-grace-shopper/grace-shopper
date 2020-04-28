import React from 'react'

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
            <option>Select</option>
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
    )
  }
}
