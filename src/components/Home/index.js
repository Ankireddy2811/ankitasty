import {Component} from 'react'

import {BsFilterLeft} from 'react-icons/bs'

import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import Cookies from 'js-cookie'

import Header from '../Header'

import Footer from '../Footer'

import EachFoodItem from '../EachFoodItem'

import './index.css'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

const apiConstants = {
  onSuccess: 'SUCCESS',
  onLoading: 'LOADING',
  onFailure: 'FAILURE',
}

class Home extends Component {
  state = {
    carouselsData: [],
    foodListsData: [],
    activePage: 1,
    totalItems: '',
    selectedSortByValue: 'Highest',
    apiStatus: 'INITIAL',
  }

  componentDidMount() {
    this.getCarouselData()
    this.getFoodsList()
  }

  getCarouselData = async () => {
    this.setState({apiStatus: apiConstants.onLoading})
    const jwtToken = Cookies.get('jwt_token')
    console.log(jwtToken)
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    try {
      const response = await fetch(
        'https://apis.ccbp.in/restaurants-list/offers',
        options,
      )
      if (response.ok) {
        const data = await response.json()
        const updatedCarouselsData = data.offers.map(eachItem => ({
          imageUrl: eachItem.image_url,
          id: eachItem.id,
        }))
        this.setState({
          carouselsData: updatedCarouselsData,
          apiStatus: apiConstants.onSuccess,
        })
      } else {
        this.setState({apiStatus: apiConstants.onFailure})
      }
    } catch (error) {
      console.log(error)
    }
  }

  getFoodsList = async () => {
    this.setState({apiStatus: apiConstants.onLoading})
    const {activePage, selectedSortByValue} = this.state
    const LIMIT = 9
    const offset = (activePage - 1) * LIMIT
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    try {
      const response = await fetch(
        `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${LIMIT}&sort_by_rating=${selectedSortByValue}`,
        options,
      )
      const data = await response.json()
      const updatedFoodListsData = data.restaurants.map(eachItem => ({
        imageUrl: eachItem.image_url,
        id: eachItem.id,
        rating: eachItem.user_rating.rating,
        totalReviews: eachItem.user_rating.total_reviews,
        name: eachItem.name,
        cuisine: eachItem.cuisine,
        ratingColor: eachItem.user_rating.rating_color,
      }))
      this.setState({
        foodListsData: updatedFoodListsData,
        totalItems: data.total,
        apiStatus: apiConstants.onSuccess,
      })
    } catch (error) {
      console.log(error)
    }
  }

  onLeftArrowClicked = () => {
    const {activePage} = this.state
    if (activePage > 1) {
      this.setState(
        prevState => ({activePage: prevState.activePage - 1}),
        this.getFoodsList,
      )
    }
  }

  onRightArrowClicked = () => {
    const {activePage, totalItems} = this.state
    if (activePage < Math.ceil(totalItems / 9)) {
      this.setState(
        prevState => ({activePage: prevState.activePage + 1}),
        this.getFoodsList,
      )
    }
  }

  onChangeRatingOption = event => {
    this.setState({selectedSortByValue: event.target.value}, this.getFoodsList)
  }

  getLoadingView = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" width={80} height={80} color="#F7931E" />
    </div>
  )

  getSuccessView = () => {
    const {foodListsData} = this.state
    return (
      <ul className="unordered-food-list">
        {foodListsData.map(eachItem => (
          <EachFoodItem key={eachItem.id} eachContent={eachItem} />
        ))}
      </ul>
    )
  }

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
    const {carouselsData, selectedSortByValue, activePage} = this.state
    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      speed: 1000,
      autoplaySpeed: 5000,
      cssEase: 'linear',
    }
    return (
      <div className="home-container">
        <Header />
        <div className="carousel-container">
          <Slider {...settings}>
            {carouselsData.map(eachItem => (
              <div className="each-carousel-slide">
                <img
                  src={eachItem.imageUrl}
                  alt={eachItem.id}
                  className="each-carousel-image"
                />
              </div>
            ))}
          </Slider>
        </div>
        <div className="popular-restaruants">
          <h1 className="popular-heading">Popular Restaurants</h1>
          <div className="filter-container">
            <p className="popular-para">
              Select Your favourite restaurant special dish and make your day
              happy...
            </p>

            <div className="filter-icon">
              <BsFilterLeft fontSize={20} />
              <select
                className="select-ele"
                value={selectedSortByValue}
                onChange={this.onChangeRatingOption}
              >
                {sortByOptions.map(eachItem => (
                  <option value={eachItem.value}>
                    Sort by {eachItem.displayText}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        {this.onRenderList()}
        <div className="pagination-container">
          <button
            className="arrow-button"
            type="button"
            data-testid="pagination-left-button"
            onClick={this.onLeftArrowClicked}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.87352 2L11 3.15074L6.25296 8L11 12.8493L9.87352 14L4.68479 8.69953C4.30425 8.3108 4.30425 7.68919 4.68479 7.30046L9.87352 2Z"
                fill="#334155"
              />
            </svg>
          </button>
          <span data-testid="active-page-number" className="pagination-para">
            {activePage} of 4
          </span>{' '}
          <button
            className="arrow-button"
            type="button"
            data-testid="pagination-right-button"
            onClick={this.onRightArrowClicked}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.12648 14L5 12.8493L9.74704 8L5 3.15074L6.12648 2L11.3152 7.30047C11.6957 7.6892 11.6957 8.31081 11.3152 8.69954L6.12648 14Z"
                fill="#334155"
              />
            </svg>
          </button>
        </div>
        <Footer />
      </div>
    )
  }
}

export default Home
