import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    inputTitle: '',
    inputDate: '',
    isFavorite: false,
    appointmentList: [],
    isErrorTitle: false,
    isErrorDate: false,
  }

  onChangeTitle = event => {
    this.setState({inputTitle: event.target.value})
  }

  onChangeDate = event => {
    this.setState({inputDate: event.target.value})
  }

  onClickAddAppointment = event => {
    event.preventDefault()

    const {inputTitle, inputDate} = this.state

    const formattedDate = inputDate
      ? format(new Date(inputDate), 'dd MMMM yyyy, EEEE')
      : ''

    const addNewAppointment = {
      id: uuidv4(),
      title: inputTitle,
      date: formattedDate,
      isStarred: false,
    }

    if (inputTitle !== '' && inputDate !== '') {
      this.setState(prevState => ({
        appointmentList: [...prevState.appointmentList, addNewAppointment],
        inputTitle: '',
        inputDate: '',
      }))
    }
    if (inputTitle === '') {
      this.setState({isErrorTitle: true})
    } else {
      this.setState({isErrorTitle: false})
    }

    if (inputDate === '') {
      this.setState({isErrorDate: true})
    } else {
      this.setState({isErrorDate: false})
    }
  }

  toggleFavorite = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachAppointment => {
        if (eachAppointment.id === id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  onClickStarredButton = () => {
    const {isFavorite} = this.state
    this.setState({isFavorite: !isFavorite})
  }

  getFilterAppointmentList = () => {
    const {appointmentList, isFavorite} = this.state
    if (isFavorite) {
      return appointmentList.filter(eachItem => eachItem.isStarred === true)
    }
    return appointmentList
  }

  render() {
    const {
      inputTitle,
      inputDate,
      isFavorite,
      isErrorTitle,
      isErrorDate,
    } = this.state

    const filterAppointmentList = this.getFilterAppointmentList()

    const filterClassName = isFavorite ? 'changeStyle' : ''

    const isEmptyAppointment = filterAppointmentList.length === 0

    return (
      <div className="add-appointment-bg-container">
        <div className="add-appointment-card">
          <div className="main-container">
            <div className="image-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="animate-image"
              />
            </div>
            <form
              className="form-container"
              onSubmit={this.onClickAddAppointment}
            >
              <h1 className="heading">Add Appointment</h1>
              <label htmlFor="Title" className="label">
                TITLE
              </label>
              <input
                id="Title"
                className="user-input"
                type="text"
                placeholder="Title"
                onChange={this.onChangeTitle}
                value={inputTitle}
              />
              {isErrorTitle ? (
                <p className="error-msg">*Please add your title</p>
              ) : (
                ''
              )}
              <label htmlFor="Date" className="label">
                DATE
              </label>
              <input
                id="Date"
                className="user-input"
                type="date"
                placeholder="dd/mm/yyyy"
                onChange={this.onChangeDate}
                value={inputDate}
              />
              {isErrorDate ? (
                <p className="error-msg">*Please add your date</p>
              ) : (
                ''
              )}
              <button type="submit" className="add-button">
                Add
              </button>
            </form>
          </div>
          <hr />
          <div>
            <div className="heading-and-button">
              <h1 className="appointment-heading">Appointments</h1>
              <button
                className={`stared-button ${filterClassName}`}
                type="button"
                onClick={this.onClickStarredButton}
              >
                Starred
              </button>
            </div>

            {isEmptyAppointment ? (
              <div className="empty-container">
                <p className="empty-msg"> The appointments are empty</p>
              </div>
            ) : (
              <ul className="appointment-items-container">
                {filterAppointmentList.map(eachItem => (
                  <AppointmentItem
                    key={eachItem.id}
                    appointmentDetails={eachItem}
                    toggleFavorite={this.toggleFavorite}
                  />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
