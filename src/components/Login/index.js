import {Component} from 'react'

import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMsg: ''}

  onRequestSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 500})
    const {history} = this.props
    history.replace('/')
  }

  onRequestFailure = errorMsg => {
    this.setState({errorMsg})
  }

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onFormContainerTrigger = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.onRequestSuccess(data.jwt_token)
    } else {
      this.onRequestFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-container">
        <div className="first-container">
          <form
            className="form-container"
            onSubmit={this.onFormContainerTrigger}
          >
            <img
              src="https://res.cloudinary.com/dcqt2hg87/image/upload/v1695573609/Frame_274_h1px52.jpg"
              alt="website login"
              className="logo-image"
            />
            <h1 className="logo-heading">Tasty Kitchens</h1>
            <h1 className="login-para">Login</h1>
            <div className="user-name-container">
              <label htmlFor="user-label" className="user-name">
                USERNAME
              </label>
              <input
                className="user-name-input"
                id="user-label"
                value={username}
                onChange={this.onChangeUserName}
              />
            </div>
            <div className="user-name-container">
              <label
                htmlFor="password-label"
                className="user-name"
                label="password-label"
              >
                PASSWORD
              </label>
              <input
                type="password"
                className="user-name-input"
                id="password-label"
                value={password}
                onChange={this.onChangePassword}
              />
            </div>
            <button className="login-button" type="submit">
              Login
            </button>
            <p className="error-msg">{errorMsg}</p>
          </form>
        </div>
        <img
          src="https://res.cloudinary.com/dcqt2hg87/image/upload/v1695572640/tasty_djx9dh.png"
          alt="website logo"
          className="login-image"
        />
        <img
          src="https://res.cloudinary.com/dcqt2hg87/image/upload/v1704432623/logout_fvj1z1.png"
          alt="login images"
          className="login-image-small-device"
        />
      </div>
    )
  }
}

export default Login
