import './index.css'

const Footer = () => (
  <div className="footer-container">
    <div className="first-footer-container">
      <img
        src="https://res.cloudinary.com/dcqt2hg87/image/upload/v1695636044/sfjl4vhmite68njbcwsc.jpg"
        alt="footer-logo"
      />
      <h1 className="footer-heading">Tasty Kitchens</h1>
    </div>

    <p className="footer-para">
      The only thing we are serious about is food. Contact us on
    </p>
    <div className="icons-container">
      <img
        src="https://res.cloudinary.com/dcqt2hg87/image/upload/v1695636071/dalav1zk6ifhk5ksplh1.jpg"
        alt="pinterest"
        className="each-image pin-image"
      />
      <img
        src="https://res.cloudinary.com/dcqt2hg87/image/upload/v1703489409/instagram_udfroh.png"
        alt="instagram"
        className="each-image"
      />

      <img
        src="https://res.cloudinary.com/dcqt2hg87/image/upload/v1703489535/twitter_ztzqds.png"
        alt="twitter"
        className="each-image"
      />
      <img
        src="https://res.cloudinary.com/dcqt2hg87/image/upload/v1695636358/Frame_13_xtrlkx.jpg"
        alt="facebook"
        className="each-image"
      />
    </div>
  </div>
)

export default Footer
