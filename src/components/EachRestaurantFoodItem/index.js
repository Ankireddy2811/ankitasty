import {Component} from 'react'
import CartContext from '../../context/CartContext'
// import Counter from '../Counter'
import './index.css'

class EachRestaurantFoodItem extends Component {
  state = {itemCount: 0, isAddView: false}

  onAddButtonClicked = () => {
    this.setState(prevState => ({
      itemCount: prevState.itemCount + 1,
      isAddView: !prevState.isAddView,
    }))
  }

  onIncrement = () => {
    this.setState(prevState => ({
      itemCount: prevState.itemCount + 1,
    }))
  }

  onDecrement = () => {
    const {itemCount} = this.state
    if (itemCount > 1) {
      this.setState(prevState => ({
        itemCount: prevState.itemCount - 1,
      }))
    } else {
      this.setState(prevState => ({
        isAddView: !prevState.isAddView,
      }))
    }
  }

  render() {
    return (
      <CartContext.Consumer>
        {value => {
          const {cartList, addCartItem} = value
          console.log(cartList)
          const {eachContent} = this.props
          const {itemCount, isAddView} = this.state
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
                      onClick={this.onDecrement}
                      className="alter-buttons"
                    >
                      -
                    </button>
                    <div className="item-count-text">{itemCount}</div>
                    <button
                      type="button"
                      onClick={this.onIncrement}
                      className="alter-buttons"
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    className="add-button"
                    type="button"
                    onClick={this.onAddButtonClicked}
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
