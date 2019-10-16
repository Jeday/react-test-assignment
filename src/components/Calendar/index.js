import React from 'react'
import PropTypes from 'prop-types'
import styles from './Calendar.css'
import CalendarHeader from './CalendarHeader'
import CalendarContent from './CalendarContent'

const Calendar = ({ month, year, incMonth, decMonth, dateColors, selectDay }) => {
  return (
    <div className={styles.container}>
      <CalendarHeader
        year={year}
        month={month}
        incMonth={incMonth}
        decMonth={decMonth}
      />
      <CalendarContent
        year={year}
        month={month}
        dateColors={dateColors}
        selectDay={selectDay}
        incMonth={incMonth}
        decMonth={decMonth}
      />
    </div>
  )
}

Calendar.propTypes = {
  year: PropTypes.number,
  month: PropTypes.number,
  dateColors: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.string,
    color: PropTypes.string
  })),
  incMonth: PropTypes.func,
  decMonth: PropTypes.func,
  selectDay: PropTypes.func
}

export default Calendar
