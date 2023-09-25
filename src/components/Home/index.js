import {Component} from 'react'

import {BsFilterLeft} from 'react-icons/bs'

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

class Home extends Component {
  state = {carouselsData: [], foodListsData: [], activePage: 1}

  componentDidMount() {
    this.getCarouselData()
    this.getFoodsList()
  }

  getCarouselData = async () => {
    const jwtToken = Cookies.get('jwt_token')
    console.log(jwtToken)
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(
      'https://apis.ccbp.in/restaurants-list/offers',
      options,
    )
    const data = await response.json()
    const updatedCarouselsData = data.offers.map(eachItem => ({
      imageUrl: eachItem.image_url,
      id: eachItem.id,
    }))
    this.setState({carouselsData: updatedCarouselsData})
  }

  getFoodsList = async () => {
    const {activePage} = this.state
    const LIMIT = 9
    const offset = (activePage - 1) * LIMIT
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(
      `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${LIMIT}`,
      options,
    )
    const data = await response.json()
    console.log(data)
    const updatedFoodListsData = data.restaurants.map(eachItem => ({
      imageUrl: eachItem.image_url,
      id: eachItem.id,
      rating: eachItem.rating,
      totalReviews: eachItem.total_reviews,
      name: eachItem.name,
      cuisine: eachItem.cuisine,
      ratingColor: eachItem.rating_color,
    }))
    this.setState({foodListsData: updatedFoodListsData})
  }

  render() {
    const {carouselsData, foodListsData} = this.state
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
        <div className="popular-restarents">
          <h1 className="popular-heading">Popular Restaurants</h1>

          <div className="filter-container">
            <p className="popular-para">
              Select Your favourite restaurant special dish and make your day
              happy...
            </p>

            <div className="filter-icon">
              <BsFilterLeft fontSize={20} />
              <select className="select-ele">
                {sortByOptions.map(eachItem => (
                  <option value={eachItem.value}>
                    Sort by {eachItem.displayText}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <ul className="unordered-food-list">
            {foodListsData.map(eachItem => (
              <EachFoodItem key={eachItem.id} eachContent={eachItem} />
            ))}
          </ul>
        </div>
        <Footer />
      </div>
    )
  }
}

export default Home
