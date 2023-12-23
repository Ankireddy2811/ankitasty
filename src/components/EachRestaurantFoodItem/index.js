import {Component} from 'react'
import CartContext from '../../context/CartContext'
// import Counter from '../Counter'
import './index.css'

class EachRestaurantFoodItem extends Component {
  state = {quantity: 0, isAddView: false}

  render() {
    return (
      <CartContext.Consumer>
        {value => {
          const {addCartItem} = value
          const {eachContent} = this.props

          const {quantity, isAddView} = this.state

          const updateIncCount = () => {
            addCartItem({...eachContent, quantity: quantity + 1})
          }

          const updateDecCount = () => {
            addCartItem({...eachContent, quantity: quantity - 1})
          }

          const onAddButtonClicked = () => {
            this.setState({isAddView: true, quantity: 1}, updateIncCount)
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
                  isAddView: false,
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
            <li className="each-restaruant-food-list-item">
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
                {isAddView ? (
                  <div className="add-sub-button-container">
                    <button
                      type="button"
                      onClick={onDecrement}
                      className="alter-buttons"
                    >
                      -
                    </button>
                    <div className="item-count-text">{quantity}</div>
                    <button
                      type="button"
                      onClick={onIncrement}
                      className="alter-buttons"
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
