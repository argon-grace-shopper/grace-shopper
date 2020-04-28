import React from 'react'
import {Link} from 'react-router-dom'

const Canceled = () => {
  return (
    <div>
      <h1>Sorry, something went wrong. Your payment was canceled.</h1>
      <Link to="/cart">Go back to cart</Link>
    </div>
  )
}

export default Canceled
