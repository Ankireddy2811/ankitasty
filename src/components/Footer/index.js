import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
  FaFacebookSquare,
} from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <div className="footer-container">
    <div className="first-footer-container">
      <img
        src="https://res.cloudinary.com/dcqt2hg87/image/upload/v1695636044/sfjl4vhmite68njbcwsc.jpg"
        alt="website-footer-logo"
      />
      <h1 className="footer-heading">Tasty Kitchens</h1>
    </div>

    <p className="footer-para">
      The only thing we are serious about is food. Contact us on
    </p>
    <div className="icons-container">
      <FaPinterestSquare
        alt="pintrest-social-icon"
        className="each-image pin-image"
        testid="pintrest-social-icon"
      />

      <FaInstagram
        alt="instagram-social-icon"
        testid="instagram-social-icon"
        className="each-image"
      />

      <FaTwitter
        alt="twitter-social-icon"
        className="each-image"
        testid="twitter-social-icon"
      />
      <FaFacebookSquare
        alt="facebook-social-icon"
        className="each-image"
        testid="facebook-social-icon"
      />
    </div>
  </div>
)

export default Footer
