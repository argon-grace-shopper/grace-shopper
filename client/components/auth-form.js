import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import {Button, Layout} from 'antd'
const {Header, Content} = Layout

const AuthForm = (props) => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div>
      <Layout>
        <Header id="header">
          <h1>{displayName}</h1>
        </Header>
        <Content id="content">
          <div className="landing">
            <form className="landing" onSubmit={handleSubmit} name={name}>
              <div>
                <label htmlFor="email">
                  <small>Email</small>
                </label>
                <input name="email" type="text" />
              </div>
              <div>
                <label htmlFor="password">
                  <small>Password</small>
                </label>
                <input name="password" type="password" />
              </div>
              <div>
                <button type="submit" className="submit-button">
                  {displayName}
                </button>
              </div>
              {error && error.response && <div> {error.response.data} </div>}
            </form>
            <a href="/auth/google">{displayName} with Google</a>
          </div>
        </Content>
      </Layout>
    </div>
  )
}

const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error,
  }
}

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error,
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    },
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object,
}
