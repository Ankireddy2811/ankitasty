// import Popup from 'reactjs-popup'
import {Component} from 'react'
// import {IoMdClose} from 'react-icons/io'
import Cookies from 'js-cookie'
import {withRouter, Link} from 'react-router-dom'

import 'reactjs-popup/dist/index.css'

import './index.css'

class Header extends Component {
  state = {isClicked: false}

  onCloseButtonClicked = () => {
    this.setState({isClicked: false})
  }

  onLogoutButtonClicked = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  onHamburgerIcon = () => {
    console.log('HI')
    this.setState(prevState => ({isClicked: !prevState.isClicked}))
  }

  render() {
    const {isClicked} = this.state

    return (
      <div className="header-container">
        <div className="first-header-container">
          <ul className="first-unordered-list">
            <Link to="/">
              <img
                src="https://res.cloudinary.com/dcqt2hg87/image/upload/v1695573609/Frame_274_h1px52.jpg"
                alt="website logo"
                className="header-logo-image"
              />
            </Link>

            <Link to="/" className="header-first-para-link">
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
                onClick={this.onLogoutButtonClicked}
              >
                Logout
              </button>
            </li>
          </ul>
          <button
            type="button"
            className="hamburger-menu"
            onClick={this.onHamburgerIcon}
          >
            <img
              src="https://res.cloudinary.com/dcqt2hg87/image/upload/v1703511061/menu_mvkbiz.png"
              alt="menu"
            />
          </button>
        </div>

        {isClicked && (
          <ul className="nav-links-list">
            <li>
              <Link to="/" className="home-list-item">
                Home
              </Link>
            </li>
            <li>
              <Link to="/cart" className="cart-list-item">
                Cart
              </Link>
            </li>

            <li className="home-list-item">
              <button
                type="button"
                className="logout-button"
                onClick={this.onLogoutButtonClicked}
              >
                Logout
              </button>
            </li>
            <li>
              <button
                type="button"
                className="small-close-button"
                onClick={this.onCloseButtonClicked}
                data-testid="closeButton"
              >
                <img
                  src="https://res.cloudinary.com/dcqt2hg87/image/upload/v1704449940/close_ajagb2.png"
                  alt="close"
                />
              </button>
            </li>
          </ul>
        )}
      </div>
    )
  }
}

export default withRouter(Header)

//  <div className="popup-container">
//         <Popup
//           modal
//           trigger={
//             <button type="button" className="hamburger-menu">
//               <img
//                 src="https://res.cloudinary.com/dcqt2hg87/image/upload/v1703511061/menu_mvkbiz.png"
//                 alt="menu"
//               />
//             </button>
//           }
//           className="popup-content"
//         >
//           {/* testid="closeButton" */}
//           {close => (
//             <div className="modal-container">
//               <button
//                 className="close-button"
//                 type="button"
//                 aria-label="Close Menu"
//                 onClick={() => close()}
//               >
//                 <IoMdClose size="30" color="#616e7c" />
//               </button>

//               <ul className="nav-links-list">
//                 <Link to="/" className="home-list-item">
//                   <li>Home</li>
//                 </Link>
//                 <Link to="/cart" className="cart-list-item">
//                   <li>Cart</li>
//                 </Link>
//                 <li className="home-list-item">
//                   <button
//                     type="button"
//                     className="logout-button"
//                     onClick={onLogoutButtonClicked}
//                   >
//                     Logout
//                   </button>
//                 </li>
//               </ul>
//             </div>
//           )}
//         </Popup>
//       </div>
//    </div>
