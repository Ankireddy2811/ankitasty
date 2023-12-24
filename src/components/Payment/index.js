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
            <h2 className="payment-text">Payment Successful</h2>
            <p className="payment-para">
              Thank you for ordering Your payment is successfully completed.
            </p>
            <button
              type="button"
              className="home-page-btn"
              onClick={onHomePageButton}
            >
              Go To Home Page
            </button>
          </div>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default Payment
