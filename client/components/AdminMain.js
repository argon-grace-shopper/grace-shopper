import React from 'react'
import PropTypes from 'prop-types'
import {logout} from '../store'
import {connect} from 'react-redux'
import {Layout, Menu, Button, Card, Tabs} from 'antd'
import AdminProducts from './AdminProducts'
import AdminOrders from './AdminOrders'
import AdminUsers from './AdminUsers'

const {Header, Footer, Content} = Layout
const {SubMenu} = Menu
const {TabPane} = Tabs
class Admin extends React.Component {
  constructor(props) {
    super(props)
    this.handleMenuClick = this.handleMenuClick.bind(this)
  }
  handleMenuClick(e) {
    this.props.history.push(`/${e.item.props.value}`)
  }
  render() {
    const {email} = this.props

    return (
      <div className="center">
        <Layout>
          <Card className="body">
            <h3 className="hr">Welcome {email}</h3>
            <Button
              href="home"
              className="add-button"
              type="primary"
              onClick={this.props.handleClick}
            >
              Logout
            </Button>
          </Card>
          <div>
            <Header id="header">
              <h1>Admin Page</h1>
            </Header>
            <Layout>
              <Tabs deafultActiveKey="1">
                <TabPane tab="Products" key="1">
                  <AdminProducts />
                </TabPane>

                <TabPane tab="Orders" key="2">
                  <AdminOrders />
                </TabPane>
                <TabPane tab="Users" key="3">
                  <AdminUsers />
                </TabPane>
              </Tabs>
              <Content id="content"></Content>
              <Footer id="footer"></Footer>
            </Layout>
          </div>
        </Layout>
      </div>
    )
  }
}
//   render() {
//     const {email} = this.props
//     return (
//       <Layout>
//         <div>
//           <Header id="header">
//             <h1>Admin Page</h1>
//           </Header>
//           <Layout>
//             <Sider id="sidebar">
//               <Menu
//                 // onChange={this.handleMenuClick}
//                 defaultSelectedKeys={[`${this.category}`]}
//                 defaultOpenKeys={['sub1']}
//                 mode="inline"
//               >
//                 <SubMenu
//                   key="sub1"
//                   title={
//                     <span>
//                       <span>Admin Actions</span>
//                     </span>
//                   }
//                 >
//                   <Menu.ItemGroup key="g1">
//                     <Menu.Item
//                       onClick={this.handleMenuClick}
//                       value="admin/products"
//                       key="0"
//                     >
//                       products
//                     </Menu.Item>
//                     <Menu.Item
//                       onClick={this.handleMenuClick}
//                       value="admin/users"
//                       key="1"
//                     >
//                       users
//                     </Menu.Item>
//                     <Menu.Item
//                       onClick={this.handleMenuClick}
//                       value="admin/orders"
//                       key="2"
//                     >
//                       orders
//                     </Menu.Item>
//                   </Menu.ItemGroup>
//                 </SubMenu>
//               </Menu>
//             </Sider>
//             <Content id="content">
//               <Card className="body">
//                 <h3>Welcome {email}</h3>
//                 <Button
//                   href="home"
//                   className="add-button"
//                   type="primary"
//                   onClick={this.props.handleClick}
//                 >
//                   Logout
//                 </Button>
//               </Card>
//             </Content>
//             <Footer id="footer"></Footer>
//           </Layout>
//         </div>
//       </Layout>
//     )
//   }
// }
const mapState = (state) => {
  return {
    email: state.user.email,
  }
}
const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout())
    },
  }
}
/**
 * PROP TYPES
 */
Admin.propTypes = {
  handleClick: PropTypes.func.isRequired,
  email: PropTypes.string,
}

export default connect(mapState, mapDispatch)(Admin)
