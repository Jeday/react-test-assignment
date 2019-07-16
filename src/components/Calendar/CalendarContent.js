import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './Calendar.css'
import { DateTime, Interval, Info } from 'luxon'

export default class CalendarContent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dateCells: [],
      activeDayIndex: -1
    }
  }

  componentDidMount() {
    this.generateDateCells()
  }

  componentDidUpdate(prevProps) {
    const { month } = this.props
    if (prevProps.month !== month)
      this.generateDateCells()
  }

  generateDateCells = () => {
    const { year, month, dateColors } = this.props
    const date = DateTime.local(year, month, 1)

    const dateCells = []

    const startDate = date.minus({ days: date.weekday - 1 })
    const endDate = startDate.plus({ days: 41 })
    const interval = Interval.fromDateTimes(startDate, endDate)

    for (let i = 0; i < interval.count('days'); i++) {
      const currentDate = startDate.plus({ days: i })
      const colorObject = dateColors.find(({ date }) => date === currentDate.toFormat('dd.MM.yyyy'))
      dateCells.push({
        number: currentDate.day,
        color: currentDate.month !== month ? '#E2E2E2' : '',
        backgroundColor: colorObject ? colorObject.color : ''
      })
    }
    this.setState({ dateCells, activeDayIndex: -1 })
  }

  handleClickDay = (day, index) => {
    const { selectDay } = this.props
    selectDay(day)
    this.setState({
      activeDayIndex: index
    })
  }

  render() {
    const { dateCells, activeDayIndex } = this.state

    const cells = dateCells.map((date, index) =>
      <div
        className={`${styles.cell} ${index === activeDayIndex ? styles.active : ''}`}
        key={index}
        style={{ backgroundColor: date.backgroundColor, color: date.color }}
        onClick={() => this.handleClickDay(date.number, index)}
      >
        {date.number}
      </div>
    )

    const weekdays = Info.weekdays('short').map((weekday, index) =>
      <div className={styles.cellWeekday} key={index}>
        {weekday}
      </div>
    )

    return (
      <div className={styles.content}>
        <div className={styles.weekdays}>
          {weekdays}
        </div>
        <div className={styles.cells}>
          {cells}
        </div>
      </div>
    )
  }
}

CalendarContent.propTypes = {
  year: PropTypes.number,
  month: PropTypes.number,
  dateColors: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.string,
    color: PropTypes.string
  })),
  selectDay: PropTypes.func
}

CalendarContent.defaultProps = {
  year: DateTime.local().year,
  month: DateTime.local().month,
  dateColors: []
}