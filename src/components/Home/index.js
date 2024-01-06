import {Component} from 'react'

import {BsFilterLeft} from 'react-icons/bs'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import Header from '../Header'

import Footer from '../Footer'

import CarouselData from '../CarouselData'

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
    foodListsData: [],
    activePage: 1,
    totalItems: '',
    selectedSortByValue: 'Highest',
    apiStatus: 'INITIAL',
  }

  componentDidMount() {
    this.getFoodsList()
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

  //   testid="restaurants-list-loader"

  getLoadingView = () => (
    <div className="loader-container" testid="restaurants-list-loader">
      <Loader type="ThreeDots" width={80} height={80} color="#F7931E" />
    </div>
  )

  getSuccessFoodListView = () => {
    const {foodListsData, activePage} = this.state
    return (
      <>
        <ul className="unordered-food-lists">
          {foodListsData.map(eachItem => (
            <EachFoodItem key={eachItem.id} eachContent={eachItem} />
          ))}
        </ul>
        <div className="pagination-container">
          <button
            className="arrow-button"
            type="button"
            testid="pagination-left-button"
            onClick={this.onLeftArrowClicked}
          >
            <img
              src="https://res.cloudinary.com/dcqt2hg87/image/upload/v1703424653/Chevron_Left_-_16px_ilu29s.png"
              alt="left-arrow"
            />
          </button>
          {/* testid="active-page-number" */}
          <span className="pagination-para" testid="active-page-number">
            {activePage} of 4
          </span>{' '}
          <button
            className="arrow-button"
            type="button"
            testid="pagination-right-button"
            onClick={this.onRightArrowClicked}
          >
            <img
              src="https://res.cloudinary.com/dcqt2hg87/image/upload/v1703424756/Chevron_Right_-_16px_ucpizv.png"
              alt="right-arrow"
            />
          </button>
        </div>
      </>
    )
  }

  onRenderFoodList = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.onSuccess:
        return this.getSuccessFoodListView()
      case apiConstants.onLoading:
        return this.getLoadingView()
      default:
        return null
    }
  }

  render() {
    const {selectedSortByValue} = this.state

    return (
      <div className="home-container">
        <Header />
        <CarouselData />
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
                  <option key={eachItem.value}>
                    Sort by {eachItem.displayText}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        {this.onRenderFoodList()}
        <Footer />
      </div>
    )
  }
}

export default Home
