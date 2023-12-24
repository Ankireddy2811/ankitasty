import {Component} from 'react'

import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import Cookies from 'js-cookie'

const apiConstants = {
  onSuccess: 'SUCCESS',
  onLoading: 'LOADING',
  onFailure: 'FAILURE',
}

class CarouselData extends Component {
  state = {
    carouselsData: [],
    apiStatus: 'INITIAL',
  }

  componentDidMount() {
    this.getCarouselData()
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

  getLoadingView = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" width={80} height={80} color="#F7931E" />
    </div>
  )

  getSuccessCarouselView = () => {
    const {carouselsData} = this.state
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
    )
  }

  onRenderCarouselList = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.onSuccess:
        return this.getSuccessCarouselView()
      case apiConstants.onLoading:
        return this.getLoadingView()
      default:
        return null
    }
  }

  render() {
    return <>{this.onRenderCarouselList()}</>
  }
}

export default CarouselData
