import {Link} from 'react-router-dom'

import './index.css'

const EmptyCartView = () => (
  <div className="cart-empty-view-container">
    <img
      src="https://res.cloudinary.com/dcqt2hg87/image/upload/v1703322378/cooking_1_jurppp.png"
      className="cart-empty-image"
      alt="cart empty"
    />
    <h1 className="cart-empty-heading">No Orders Yet!</h1>
    <p className="cart-empty-para">
      Your cart is empty. Add something from the menu.
    </p>

    <button type="button" className="order-now-btn">
      Order Now
    </button>
  </div>
)

export default EmptyCartView
