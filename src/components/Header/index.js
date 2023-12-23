import Cookies from 'js-cookie'
import {withRouter, Link} from 'react-router-dom'

import './index.css'

const Header = props => {
  const {history} = props
  const onLogoutButtonClicked = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="header-container">
      <div className="first-unordered-list">
        <img
          src="https://res.cloudinary.com/dcqt2hg87/image/upload/v1695573609/Frame_274_h1px52.jpg"
          alt="logo"
          className="header-logo-image"
        />
        <p className="header-first-para">Tasty Kitchens</p>
      </div>
      <ul className="second-unordered-list">
        <Link to="/" className="home-list-item">
          Home
        </Link>
        <Link to="/cart" className="cart-list-item">
          Cart
        </Link>
        <li className="home-list-item">
          <button
            type="button"
            className="logout-button"
            onClick={onLogoutButtonClicked}
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  )
}

export default withRouter(Header)
