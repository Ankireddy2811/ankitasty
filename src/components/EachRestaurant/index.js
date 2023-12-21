import {Component} from 'react'

import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import Cookies from 'js-cookie'

import Header from '../Header'
import EachRestaurantFoodItem from '../EachRestaurantFoodItem'

import Footer from '../Footer'

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
    apiStatus: 'INITIAL',
  }

  componentDidMount() {
    this.getRestaurantFoodsList()
  }

  getRestaurantFoodsList = async () => {
    this.setState({apiStatus: apiConstants.onLoading})
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
        apiStatus: apiConstants.onSuccess,
      })
    } catch (error) {
      console.log(error)
    }
  }

  getLoadingView = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" width={80} height={80} color="#F7931E" />
    </div>
  )

  //   getSuccessView = () => {
  //     const {foodListsData} = this.state
  //     return (
  //       <ul className="unordered-food-list">
  //         {foodListsData.map(eachItem => (
  //           <EachFoodItem key={eachItem.id} eachContent={eachItem} />
  //         ))}
  //       </ul>
  //     )
  //   }

  onRenderList = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.onSuccess:
        return this.getSuccessView()
      case apiConstants.onLoading:
        return this.getLoadingView()
      default:
        return null
    }
  }

  render() {
    const {restaurantData, restaurantFoodItems} = this.state
    return (
      <div className="home-container">
        <Header />
        <div className="restaruant-details-container">
          <img
            src={restaurantData.imageUrl}
            alt={restaurantData.name}
            className="main-image"
          />
          <div className="restaurant-each-detail-container">
            <h1 className="restaurant-name">{restaurantData.name}</h1>
            <p className="restaurant-cuisine">{restaurantData.cuisine}</p>
            <p className="restaurant-location">{restaurantData.location}</p>
            <div className="rating-reviews-container">
              <div>
                <h2 className="restaurant-rating">{restaurantData.rating}</h2>

                <p className="restaurant-total-ratings">{`${restaurantData.totalReviews}+ Ratings`}</p>
              </div>
              <hr className="horizontal-line" />
              <div>
                <h2 className="restaurant-two-items">
                  {restaurantData.costForTwo}
                </h2>
                <p className="restaurant-two-items-para">Cost for two</p>
              </div>
            </div>
          </div>
        </div>
        <ul className="unordered-food-items">
          {restaurantFoodItems.map(eachItem => (
            <EachRestaurantFoodItem eachContent={eachItem} key={eachItem.id} />
          ))}
        </ul>
        <Footer />
      </div>
    )
  }
}

export default EachRestaurant
