// import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
// import {AiFillCloseCircle} from 'react-icons/ai'

import CartContext from '../../context/CartContext'

import './index.css'

const CartItem = props => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      console.log(cartList)
      const {cartItemDetails} = props
      const {name, quantity, cost, imageUrl} = cartItemDetails

      /* const onDeleteCartItem = () => {
        deleteCartItem(id)
      } */

      return (
        <li className="cart-item">
          <img className="cart-product-image" src={imageUrl} alt={name} />
          <div className="cart-item-details-container">
            <div className="cart-product-title-brand-container">
              <p className="cart-product-title">{name}</p>
            </div>
            <div className="cart-quantity-container">
              <button type="button" className="alter-buttons">
                -
              </button>
              <p className="cart-quantity">{quantity}</p>
              <button type="button" className="alter-buttons">
                +
              </button>
            </div>
            <div className="total-price-delete-container">
              <p className="cart-total-price">Rs {cost * quantity}/-</p>
              <button
                className="remove-button"
                type="button"
                // onClick={onDeleteCartItem}
              >
                Remove
              </button>
            </div>
          </div>
          <button
            className="delete-button"
            type="button"
            // onClick={onDeleteCartItem}
          >
            {/* <AiFillCloseCircle color="#616E7C" size={20} /> */}
          </button>
        </li>
      )
    }}
  </CartContext.Consumer>
)

export default CartItem
