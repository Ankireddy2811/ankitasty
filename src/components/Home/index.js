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

class Home extends Component {
  state = {
    carouselsData: [],
    foodListsData: [],
    activePage: 1,
    totalItems: '',
    selectedSortByValue: 'Highest',
  }

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
    const {activePage, selectedSortByValue} = this.state
    console.log(activePage)
    const LIMIT = 9
    const offset = (activePage - 1) * LIMIT
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(
      `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${LIMIT}&sort_by_rating=${selectedSortByValue}`,
      options,
    )
    const data = await response.json()
    console.log(data)
    const updatedFoodListsData = data.restaurants.map(eachItem => ({
      imageUrl: eachItem.image_url,
      id: eachItem.id,
      rating: eachItem.user_rating.rating,
      totalReviews: eachItem.user_rating.total_reviews,
      name: eachItem.name,
      cuisine: eachItem.cuisine,
      ratingColor: eachItem.user_rating.rating_color,
    }))
    this.setState({foodListsData: updatedFoodListsData, totalItems: data.total})
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

  LoaderContainer = () => (
    <div>
      <Loader type="threeDots" width="100" height="100" color="red" />
    </div>
  )

  render() {
    const {
      carouselsData,
      foodListsData,

      activePage,
      selectedSortByValue,
    } = this.state
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
      <div>
        <Loader type="threeD" width="100" height="100" color="red" />
      </div>
      //   <div className="home-container">
      //     <Header />
      //     <div className="carousel-container">
      //       <Slider {...settings}>
      //         {carouselsData.map(eachItem => (
      //           <div className="each-carousel-slide">
      //             <img
      //               src={eachItem.imageUrl}
      //               alt={eachItem.id}
      //               className="each-carousel-image"
      //             />
      //           </div>
      //         ))}
      //       </Slider>
      //     </div>
      //     <div className="popular-restarents">
      //       <h1 className="popular-heading">Popular Restaurants</h1>

      //       <div className="filter-container">
      //         <p className="popular-para">
      //           Select Your favourite restaurant special dish and make your day
      //           happy...
      //         </p>

      //         <div className="filter-icon">
      //           <BsFilterLeft fontSize={20} />
      //           <select
      //             className="select-ele"
      //             value={selectedSortByValue}
      //             onChange={this.onChangeRatingOption}
      //           >
      //             {sortByOptions.map(eachItem => (
      //               <option value={eachItem.value}>
      //                 Sort by {eachItem.displayText}
      //               </option>
      //             ))}
      //           </select>
      //         </div>
      //       </div>
      //       <ul className="unordered-food-list">
      //         {foodListsData.map(eachItem => (
      //           <EachFoodItem key={eachItem.id} eachContent={eachItem} />
      //         ))}
      //       </ul>
      //       <div className="pagination-container">
      //         <button
      //           className="arrow-button"
      //           type="button"
      //           onClick={this.onLeftArrowClicked}
      //         >
      //           <svg
      //             xmlns="http://www.w3.org/2000/svg"
      //             width="16"
      //             height="16"
      //             viewBox="0 0 16 16"
      //             fill="none"
      //           >
      //             <path
      //               fillRule="evenodd"
      //               clipRule="evenodd"
      //               d="M9.87352 2L11 3.15074L6.25296 8L11 12.8493L9.87352 14L4.68479 8.69953C4.30425 8.3108 4.30425 7.68919 4.68479 7.30046L9.87352 2Z"
      //               fill="#334155"
      //             />
      //           </svg>
      //         </button>
      //         <p className="pagination-para">{activePage} of 4</p>
      //         <button
      //           className="arrow-button"
      //           type="button"
      //           onClick={this.onRightArrowClicked}
      //         >
      //           <svg
      //             xmlns="http://www.w3.org/2000/svg"
      //             width="16"
      //             height="16"
      //             viewBox="0 0 16 16"
      //             fill="none"
      //           >
      //             <path
      //               fillRule="evenodd"
      //               clipRule="evenodd"
      //               d="M6.12648 14L5 12.8493L9.74704 8L5 3.15074L6.12648 2L11.3152 7.30047C11.6957 7.6892 11.6957 8.31081 11.3152 8.69954L6.12648 14Z"
      //               fill="#334155"
      //             />
      //           </svg>
      //         </button>
      //       </div>
      //     </div>
      //     <Footer />
      //   </div>
    )
  }
}

export default Home
