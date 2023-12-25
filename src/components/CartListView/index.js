import {withRouter} from 'react-router-dom'
import CartItem from '../CartItem'
import CartContext from '../../context/CartContext'

import './index.css'

const CartListView = props => (
  <CartContext.Consumer>
    {value => {
      const {cartList, deleteCartItem} = value
      console.log(cartList)

      const calculateTotalPrice = () => {
        let totalPriceValue = 0
        cartList.forEach(eachItem => {
          totalPriceValue += eachItem.cost * eachItem.quantity
        })
        return totalPriceValue
      }

      const onPlaceOrderButton = () => {
        const {history} = props
        history.replace('/payment')
      }

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
            <CartItem
              key={eachCartItem.id}
              cartItemDetails={eachCartItem}
              deleteCartItem={deleteCartItem}
            />
          ))}
          <img
            src="https://res.cloudinary.com/dcqt2hg87/image/upload/v1703411535/Line_5_fofa8z.png"
            alt="line"
            className="line"
          />
          <div className="total-price-container">
            <h1 className="order-total">Order Total :</h1>
            <p className="total-price">₹ {calculateTotalPrice()}</p>
          </div>
          <button
            className="place-order-btn"
            type="button"
            onClick={onPlaceOrderButton}
          >
            Place Order
          </button>
        </ul>
      )
    }}
  </CartContext.Consumer>
)

export default withRouter(CartListView)
