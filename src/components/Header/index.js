import Popup from 'reactjs-popup'

import Cookies from 'js-cookie'
import {withRouter, Link} from 'react-router-dom'

import 'reactjs-popup/dist/index.css'

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
        <Link to="/">
          <img
            src="https://res.cloudinary.com/dcqt2hg87/image/upload/v1695573609/Frame_274_h1px52.jpg"
            alt="logo"
            className="header-logo-image"
          />
        </Link>

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
        <div className="popup-container">
          <Popup
            modal
            trigger={
              <button type="button" className="hamburger-menu">
                <img
                  src="https://res.cloudinary.com/dcqt2hg87/image/upload/v1703511061/menu_mvkbiz.png"
                  alt="menu"
                />
              </button>
            }
          >
            {close => (
              <>
                <Link to="/" className="home-list-item">
                  Home
                </Link>
                <button
                  type="button"
                  className="trigger-button"
                  onClick={() => close()}
                >
                  x
                </button>
              </>
            )}
          </Popup>
        </div>
      </ul>
    </div>
  )
}

export default withRouter(Header)
