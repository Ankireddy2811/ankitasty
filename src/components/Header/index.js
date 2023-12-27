import Popup from 'reactjs-popup'
import {IoMdClose} from 'react-icons/io'
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
      <ul className="first-unordered-list">
        <Link to="/">
          <img
            src="https://res.cloudinary.com/dcqt2hg87/image/upload/v1695573609/Frame_274_h1px52.jpg"
            alt="website logo"
            className="header-logo-image"
          />
        </Link>

        <Link to="/">
          <p className="header-first-para">Tasty Kitchens</p>
        </Link>
      </ul>
      <ul className="second-unordered-list">
        <Link to="/" className="home-list-item">
          <li>Home</li>
        </Link>
        <Link to="/cart" className="cart-list-item">
          <li>Cart</li>
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
            className="popup-content"
          >
            {close => (
              <div className="modal-container">
                <button
                  className="close-button"
                  type="button"
                  testid="closeButton"
                  aria-label="Close Menu"
                  onClick={() => close()}
                >
                  <IoMdClose size="30" color="#616e7c" />
                </button>

                <ul className="nav-links-list">
                  <li className="nav-link-item">
                    <Link className="nav-link" to="/" onClick={() => close()}>
                      <p className="nav-link-content">Home</p>
                    </Link>
                  </li>
                  <li className="nav-link-item">
                    <Link className="nav-link" to="/cart">
                      Cart
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </Popup>
        </div>
      </ul>
    </div>
  )
}

export default withRouter(Header)
