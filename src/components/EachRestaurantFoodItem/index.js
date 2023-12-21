import './index.css'

const EachRestaurantFoodItem = props => {
  const {eachContent} = props
  return (
    <li className="each-restaruant-food-list-item">
      <img
        src={eachContent.imageUrl}
        alt={eachContent.name}
        className="each-food-item-image"
      />
      <div className="item-details">
        <h2 className="item-name">{eachContent.name}</h2>
        <p className="item-cost">₹ {eachContent.cost}</p>
        <span className="item-rating-container">
          <img
            src="https://res.cloudinary.com/dcqt2hg87/image/upload/v1703165215/star_rktiju.png"
            alt="rating"
          />
          <h2 className="item-rating">{eachContent.rating}</h2>
        </span>
        <button className="add-button" type="button">
          ADD
        </button>
      </div>
    </li>
  )
}

export default EachRestaurantFoodItem
