import React from 'react'
import {Layout} from 'antd'
const {Footer} = Layout

const Home = () => {
  return (
    <div className="home">
      <img
        id="greenhouse-img"
        alt="greenhouse-image"
        src="https://doorflip.com/wp-content/uploads/2019/05/fig-tree-indoor-plant-with-light-green-background.jpg"
      />
      <Footer id="footer">Copyright © 2020 The Plant Store</Footer>
    </div>
  )
}
export default Home
