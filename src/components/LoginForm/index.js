import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    onShowErrorMessage: false,
    errorMsg: '',
  }

  onSubmitFailure = errorMsg => {
    this.setState({onShowErrorMessage: true, errorMsg})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderUsernameContainer = () => {
    const {username} = this.state

    return (
      <>
        <label htmlFor="username" className="label">
          USERNAME
        </label>
        <input
          id="username"
          type="text"
          placeholder="Username"
          className="input-values"
          value={username}
          onChange={this.onChangeUsername}
        />
      </>
    )
  }

  renderPasswordContainer = () => {
    const {password} = this.state

    return (
      <>
        <label htmlFor="password" className="label">
          PASSWORD
        </label>
        <input
          id="password"
          type="password"
          placeholder="Password"
          className="input-values"
          value={password}
          onChange={this.onChangePassword}
        />
      </>
    )
  }

  render() {
    const {onShowErrorMessage, errorMsg} = this.state
    return (
      <div className="bg-container">
        <form className="form-element" onSubmit={this.onSubmitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="image"
          />
          <div className="input-container">
            {this.renderUsernameContainer()}
          </div>
          <div className="input-container">
            {this.renderPasswordContainer()}
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
          {onShowErrorMessage && <p className="errorMsg">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default LoginForm
