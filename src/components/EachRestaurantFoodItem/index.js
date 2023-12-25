import {Component} from 'react'
import CartContext from '../../context/CartContext'
// import Counter from '../Counter'
import './index.css'

class EachRestaurantFoodItem extends Component {
  constructor(props) {
    super(props)
    const {eachContent} = this.props
    this.state = {
      quantity: eachContent.quantity > 0 ? eachContent.quantity : 0,
    }
  }

  render() {
    return (
      <CartContext.Consumer>
        {value => {
          const {addCartItem, deleteCartItem} = value
          const {eachContent} = this.props

          const {quantity} = this.state

          const updateIncCount = () => {
            addCartItem({...eachContent, quantity: quantity + 1})
          }

          const updateDecCount = () => {
            if (quantity <= 1) {
              deleteCartItem(eachContent.id)
            } else {
              addCartItem({...eachContent, quantity: quantity - 1})
            }
          }

          const onAddButtonClicked = () => {
            this.setState({quantity: 1}, updateIncCount)
          }

          const onDecrement = () => {
            if (quantity > 1) {
              this.setState(
                prevState => ({quantity: prevState.quantity - 1}),
                updateDecCount,
              )
            } else {
              this.setState(
                {
                  quantity: 0,
                },
                updateDecCount,
              )
            }
          }

          const onIncrement = () => {
            this.setState(
              prevState => ({quantity: prevState.quantity + 1}),
              updateIncCount,
            )
          }

          return (
            <li
              className="each-restaruant-food-list-item"
              data-testid="foodItem"
            >
              <img
                src={eachContent.imageUrl}
                alt={eachContent.name}
                className="each-food-item-image"
              />
              <div className="item-details">
                <h2 className="item-name">{eachContent.name}</h2>
                <p className="item-cost">₹ {eachContent.cost}</p>
                <span className="item-rating-container">
                  <img
                    src="https://res.cloudinary.com/dcqt2hg87/image/upload/v1703165215/star_rktiju.png"
                    alt="rating"
                  />
                  <h2 className="item-rating">{eachContent.rating}</h2>
                </span>
                {quantity > 0 ? (
                  <div className="add-sub-button-container">
                    <button
                      type="button"
                      onClick={onDecrement}
                      data-testid="decrement-count"
                      className="alter-buttons"
                    >
                      -
                    </button>
                    <div className="item-count-text" data-testid="active-count">
                      {quantity}
                    </div>
                    <button
                      type="button"
                      onClick={onIncrement}
                      className="alter-buttons"
                      data-testid="increment-count"
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    className="add-button"
                    type="button"
                    onClick={onAddButtonClicked}
                  >
                    ADD
                  </button>
                )}
              </div>
            </li>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default EachRestaurantFoodItem
