import CartItem from '../CartItem'
import CartContext from '../../context/CartContext'

import './index.css'

const CartListView = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      return (
        <ul className="cart-list">
          <li className="header-cart-item">
            <div className="header-cart-item-details-container">
              <div className="header-cart-product-title-brand-container">
                <p className="header-cart-product-title">Item</p>
              </div>
              <div className="header-cart-quantity-container">
                <p className="header-cart-quantity">Quantity</p>
              </div>
              <div className="header-total-price-container">
                <p className="header-cart-total-price">Price</p>
              </div>
            </div>
          </li>

          {cartList.map(eachCartItem => (
            <CartItem key={eachCartItem.id} cartItemDetails={eachCartItem} />
          ))}
        </ul>
      )
    }}
  </CartContext.Consumer>
)

export default CartListView
