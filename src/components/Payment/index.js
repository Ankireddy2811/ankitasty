import {Link} from 'react-router-dom'
import CartContext from '../../context/CartContext'
import Header from '../Header'

import './index.css'

const Payment = props => (
  <CartContext.Consumer>
    {value => {
      const {clearAllCartItems} = value
      const onHomePageButton = () => {
        const {history} = props
        clearAllCartItems()
        history.replace('/')
      }
      return (
        <div className="payment-container">
          <Header />
          <div className="payment-text-container">
            <img
              src="https://res.cloudinary.com/dcqt2hg87/image/upload/v1703421464/check-circle.1_1_g7jver.png"
              alt="payment"
            />
            <h1 className="payment-text">Payment Successful</h1>
            <p className="payment-para">
              Thank you for ordering Your payment is successfully completed.
            </p>
            <Link to="/" className="link-not-found">
              <button
                type="button"
                className="home-page-btn"
                onClick={onHomePageButton}
              >
                Go To Home Page
              </button>
            </Link>
          </div>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default Payment
