import {Component} from 'react'

import './index.css'

class CartItem extends Component {
  constructor(props) {
    super(props)
    const {cartItemDetails} = this.props
    const {quantity, cost} = cartItemDetails
    this.state = {quantity, cost}
  }

  onIncButtonClicked = () => {
    this.setState(prevState => ({
      quantity: prevState.quantity + 1,
    }))
  }

  onDecButtonClicked = () => {
    const {quantity} = this.state
    if (quantity > 1) {
      this.setState(prevState => ({
        quantity: prevState.quantity - 1,
      }))
    } else {
      const {cartItemDetails, deleteCartItem} = this.props
      deleteCartItem(cartItemDetails.id)
    }
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
      <li className="cart-item">
        <img className="cart-product-image" src={imageUrl} alt={name} />
        <div className="cart-item-details-container">
          <div className="cart-product-title-brand-container">
            <p className="cart-product-title">{name}</p>
          </div>
          <div className="cart-quantity-container">
            <button
              type="button"
              className="alter-buttons"
              onClick={this.onDecButtonClicked}
            >
              -
            </button>
            <p className="cart-quantity">{quantity}</p>
            <button
              type="button"
              className="alter-buttons"
              onClick={this.onIncButtonClicked}
            >
              +
            </button>
          </div>
          <div className="total-price-delete-container">
            <p className="cart-total-price">₹ {this.calculateCost()}/-</p>
          </div>
        </div>
      </li>
    )
  }
}

export default CartItem
