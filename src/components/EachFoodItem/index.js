import './index.css'

const EachFoodItem = props => {
  const {eachContent} = props
  return (
    <li className="each-food-list-item">
      <img
        src={eachContent.imageUrl}
        alt={eachContent.name}
        className="each-food-image"
      />
      <div className="food-text-container">
        <h1 className="each-food-heading">{eachContent.name}</h1>
        <h1 className="each-food-para">{eachContent.cuisine}</h1>
      </div>
    </li>
  )
}

export default EachFoodItem
