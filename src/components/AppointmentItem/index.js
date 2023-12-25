import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, toggleFavorite} = props
  const {id, title, date, isStarred} = appointmentDetails

  const onclickStar = () => {
    toggleFavorite(id)
  }

  const isFavoriteImageUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="appointment-main-item">
      <div className="appointment-item">
        <div className="title-and-star-item">
          <p className="title-name">{title}</p>
          <button
            className="star-icon-button"
            type="button"
            onClick={onclickStar}
            data-testid="star"
          >
            <img
              src={isFavoriteImageUrl}
              className="favorite-star-icon-image"
              alt="star"
            />
          </button>
        </div>
        <p className="selected-date">{date}</p>
      </div>
    </li>
  )
}

export default AppointmentItem
