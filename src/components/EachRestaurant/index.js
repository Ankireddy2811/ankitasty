import {Component} from 'react'

import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import Cookies from 'js-cookie'

import Header from '../Header'
import EachRestaurantFoodItem from '../EachRestaurantFoodItem'

import Footer from '../Footer'

import CartContext from '../../context/CartContext'

import './index.css'

const apiConstants = {
  onSuccess: 'SUCCESS',
  onLoading: 'LOADING',
  onFailure: 'FAILURE',
}

class EachRestaurant extends Component {
  state = {
    restaurantData: {},
    restaurantFoodItems: [],
    apiRestaurantFoodListStatus: 'INITIAL',
    apiRestaurantDetailsStatus: 'INITIAL',
  }

  componentDidMount() {
    this.getRestaurantFoodsList()
  }

  getRestaurantFoodsList = async () => {
    this.setState({apiRestaurantFoodListStatus: apiConstants.onLoading})
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const {match} = this.props
    const {params} = match
    const {id} = params
    try {
      const response = await fetch(
        `https://apis.ccbp.in/restaurants-list/${id}`,
        options,
      )
      const data = await response.json()
      console.log(data)
      const updatedRestaurantDetails = {
        rating: data.rating,
        totalReviews: data.reviews_count,
        name: data.name,
        cuisine: data.cuisine,
        location: data.location,
        imageUrl: data.image_url,
        costForTwo: data.cost_for_two,
      }
      const updatedRestaurantFoodItems = data.food_items.map(eachItem => ({
        name: eachItem.name,
        cost: eachItem.cost,
        imageUrl: eachItem.image_url,
        rating: eachItem.rating,
        id: eachItem.id,
      }))
      this.setState({
        restaurantData: updatedRestaurantDetails,
        restaurantFoodItems: updatedRestaurantFoodItems,
        apiRestaurantFoodListStatus: apiConstants.onSuccess,
        apiRestaurantDetailsStatus: apiConstants.onSuccess,
      })
    } catch (error) {
      console.log(error)
    }
  }

  getRestaurantDetailsSuccessView = () => {
    const {restaurantData} = this.state
    return (
      <>
        <img
          src={restaurantData.imageUrl}
          alt="restaurant"
          className="main-image"
        />
        <div className="restaurant-each-detail-container">
          <h1 className="restaurant-name">{restaurantData.name}</h1>
          <p className="restaurant-cuisine">{restaurantData.cuisine}</p>
          <p className="restaurant-location">{restaurantData.location}</p>
          <div className="rating-reviews-container">
            <div>
              <p className="restaurant-rating">{restaurantData.rating}</p>

              <p className="restaurant-total-ratings">{`${restaurantData.totalReviews}+ Ratings`}</p>
            </div>
            <hr className="horizontal-line" />
            <div>
              <p className="restaurant-two-items">
                {restaurantData.costForTwo}
              </p>
              <p className="restaurant-two-items-para">Cost for two</p>
            </div>
          </div>
        </div>
      </>
    )
  }

  render() {
    const {
      restaurantFoodItems,
      apiRestaurantFoodListStatus,
      apiRestaurantDetailsStatus,
    } = this.state
    return (
      <CartContext.Consumer>
        {value => {
          const {cartList} = value

          const geteachResturantItem = eachItem => {
            let foundCartItem = null

            cartList.forEach(eachCartItem => {
              if (eachCartItem.id === eachItem.id) {
                foundCartItem = eachCartItem
              }
            })

            return foundCartItem === null ? eachItem : foundCartItem
          }

          /* testid="restaurant-details-loader" */

          const getLoadingView = () => (
            <div className="loader-container">
              <Loader type="ThreeDots" width={80} height={80} color="#F7931E" />
            </div>
          )

          const getRestaurantFoodSuccessView = () => (
            <ul className="unordered-food-items">
              {restaurantFoodItems.map(eachItem => (
                <EachRestaurantFoodItem
                  eachContent={geteachResturantItem(eachItem)}
                  key={eachItem.id}
                />
              ))}
            </ul>
          )

          return (
            <div className="each-restaruant-container">
              <Header />
              <div className="restaruant-details-container">
                {apiRestaurantDetailsStatus === 'SUCCESS'
                  ? this.getRestaurantDetailsSuccessView()
                  : getLoadingView()}
              </div>
              {apiRestaurantFoodListStatus === 'SUCCESS'
                ? getRestaurantFoodSuccessView()
                : getLoadingView()}
              <Footer />
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default EachRestaurant
