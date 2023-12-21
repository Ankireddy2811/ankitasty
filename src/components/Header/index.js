import Cookies from 'js-cookie'
import {withRouter} from 'react-router-dom'

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
        <li className="home-list-item">Home</li>
        <li className="cart-list-item">Cart</li>
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
