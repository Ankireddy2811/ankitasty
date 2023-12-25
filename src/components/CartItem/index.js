import {Component} from 'react'
import CartContext from '../../context/CartContext'

import './index.css'

class CartItem extends Component {
  constructor(props) {
    super(props)
    const {cartItemDetails} = this.props
    const {quantity, cost} = cartItemDetails
    this.state = {quantity, cost}
  }

  calculateCost = () => {
    const {quantity, cost} = this.state
    return quantity * cost
  }

  render() {
    const {cartItemDetails} = this.props
    const {name, imageUrl} = cartItemDetails
    const {quantity} = this.state

    return (
      <CartContext.Consumer>
        {value => {
          const {addCartItem, deleteCartItem} = value

          const updateIncCartCount = () => {
            addCartItem({...cartItemDetails, quantity: quantity + 1})
          }

          const updateDecCartCount = () => {
            addCartItem({...cartItemDetails, quantity: quantity - 1})
          }

          const onIncButtonClicked = () => {
            this.setState(
              prevState => ({
                quantity: prevState.quantity + 1,
              }),
              updateIncCartCount,
            )
          }

          const onDecButtonClicked = () => {
            if (quantity > 1) {
              this.setState(
                prevState => ({
                  quantity: prevState.quantity - 1,
                }),
                updateDecCartCount,
              )
            } else {
              deleteCartItem(cartItemDetails.id)
            }
          }

          return (
            <li data-testid="cartItem" className="cart-item">
              <img className="cart-product-image" src={imageUrl} alt={name} />
              <div className="cart-item-details-container">
                <div className="cart-product-title-brand-container">
                  <p className="cart-product-title">{name}</p>
                </div>
                <div className="cart-quantity-container">
                  <button
                    type="button"
                    className="alter-buttons"
                    data-testid="decrement-quantity"
                    onClick={onDecButtonClicked}
                  >
                    -
                  </button>
                  <p className="cart-quantity" data-testid="item-quantity">
                    {quantity}
                  </p>
                  <button
                    type="button"
                    className="alter-buttons"
                    data-testid="increment-quantity"
                    onClick={onIncButtonClicked}
                  >
                    +
                  </button>
                </div>
                <div
                  className="total-price-delete-container"
                  data-testid="total-price"
                >
                  <p className="cart-total-price">₹ {this.calculateCost()}/-</p>
                </div>
              </div>
            </li>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default CartItem
