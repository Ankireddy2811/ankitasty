import {Link} from 'react-router-dom'
import './index.css'

const NotFound = props => {
  const onHomePageButton = () => {
    const {history} = props
    history.replace('/')
  }

  return (
    <div className="not-found-container">
      <img
        src="https://res.cloudinary.com/dcqt2hg87/image/upload/v1703422260/erroring_1_xq5cef.png"
        alt="not found"
      />
      <h2 className="not-found-heading">Page Not Found</h2>
      <p className="not-found-para">
        We are sorry, the page you requested could not be found. Please go back
        to the homepage
      </p>
      <Link to="/" className="link-not-found">
        <button
          type="button"
          className="home-page-btn"
          onClick={onHomePageButton}
        >
          Home Page
        </button>
      </Link>
    </div>
  )
}

export default NotFound
