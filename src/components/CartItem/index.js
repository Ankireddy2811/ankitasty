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

          /* testid="cartItem" */

          return (
            <div className="cart-item">
              <img className="cart-product-image" src={imageUrl} alt={name} />
              <div className="cart-item-details-container">
                <div className="cart-product-title-brand-container">
                  <h1 className="cart-product-title">{name}</h1>
                </div>
                {/* testid="decrement-quantity" */}
                <div className="cart-quantity-container">
                  <button
                    type="button"
                    className="alter-buttons"
                    onClick={onDecButtonClicked}
                  >
                    -
                  </button>
                  {/* testid="item-quantity" */}
                  <p className="cart-quantity">{quantity}</p>
                  {/* testid="increment-quantity" */}
                  <button
                    type="button"
                    className="alter-buttons"
                    onClick={onIncButtonClicked}
                  >
                    +
                  </button>
                </div>
                {/* testid="total-price" */}
                <div className="total-price-delete-container">
                  <p className="cart-total-price">₹ {this.calculateCost()}/-</p>
                </div>
              </div>
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default CartItem
