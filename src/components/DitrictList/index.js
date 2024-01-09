import './index.css'

const DitrictList = props => {
  const {each, districtsData, currentCard} = props

  return (
    <li className="district-stat">
      <p className="district-stat-count">
        {currentCard === 'Active'
          ? districtsData[each].total.confirmed -
            (districtsData[each].total.recovered +
              districtsData[each].total.deceased)
          : districtsData[each].total[currentCard.toLowerCase()]}
        <span className="district-name">{each}</span>
      </p>
    </li>
  )
}
export default DitrictList
