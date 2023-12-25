import {withRouter, Link} from 'react-router-dom'

import './index.css'

const EmptyCartView = props => {
  const onOrderNowButton = () => {
    const {history} = props
    history.replace('/')
  }
  return (
    <div className="cart-empty-view-container">
      <img
        src="https://res.cloudinary.com/dcqt2hg87/image/upload/v1703322378/cooking_1_jurppp.png"
        className="cart-empty-image"
        alt="empty cart"
      />
      <h1 className="cart-empty-heading">No Order Yet!</h1>
      <p className="cart-empty-para">
        Your cart is empty. Add something from the menu.
      </p>
      <Link to="/" className="link-not-found">
        <button
          type="button"
          className="order-now-btn"
          onClick={onOrderNowButton}
        >
          Order Now
        </button>
      </Link>
    </div>
  )
}

export default withRouter(EmptyCartView)
