import React from 'react'
import PropTypes from 'prop-types'
import styles from './Calendar.css'
import ArrowLeft from 'Img/arrow-left.svg'
import ArrowRight from 'Img/arrow-right.svg'
import { DateTime } from 'luxon'

const CalendarHeader = ({ month, year, incMonth, decMonth }) => {
  const monthName = DateTime.local(year, month).monthLong.toLocaleUpperCase()

  return (
    <div className={styles.header}>
      <ArrowLeft onClick={decMonth} />
      <span>
        {monthName} {year}
      </span>
      <ArrowRight onClick={incMonth} />
    </div>
  )
}

CalendarHeader.propTypes = {
  month: PropTypes.number,
  year: PropTypes.number,
  incMonth: PropTypes.func,
  decMonth: PropTypes.func
}

CalendarHeader.defaultProps = {
  year: DateTime.local().year,
  month: DateTime.local().month
}

export default CalendarHeader