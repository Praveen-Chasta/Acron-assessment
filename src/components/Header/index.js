import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props

    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <>
      <nav className="nav-container">
        <ul className="header-container">
          <li>
            <Link to="/" className="link-items">
              <img
                src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
                alt="website logo"
                className="website-logo"
              />
            </Link>
          </li>
          <li className="icon-container">
            <Link to="/" className="link-items">
              <p className="icons">Home</p>
            </Link>
            <Link to="/jobs" className="link-items">
              <p className="icons">Jobs</p>
            </Link>
          </li>
          <li>
            <button
              type="button"
              className="logout-button"
              onClick={onClickLogout}
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </>
  )
}
export default withRouter(Header)
