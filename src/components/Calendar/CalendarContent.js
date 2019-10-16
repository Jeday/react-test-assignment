import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './Calendar.css'
import { DateTime, Interval, Info } from 'luxon'

export default class CalendarContent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dateCells: [],
      activeDayIndex: -1,
      switchBackIndex: -1,
      switchForthIndex: -1,
      activeDay:-1,
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


    const switchForthDate = date.plus({month: 1})
    const switchBackDate = date.minus({day:1})


    const dateCells = []

    const startDate = date.minus({ days: date.weekday - 1 })
    const endDate = startDate.plus({ days: 41 })

    var ind = -1
    if(this.state.activeDay != -1){
      const activeDate =DateTime.local(year, month, this.state.activeDay)
      ind =  Interval.fromDateTimes(startDate,activeDate).count('days')-1
    }


    const interval = Interval.fromDateTimes(startDate, endDate)


    var switchBackIndex = Interval.fromDateTimes(startDate,switchBackDate).count('days')-1
    if(switchBackIndex == NaN)
      switchBackIndex = -1
    var switchForthIndex =interval.count('days') - Interval.fromDateTimes(switchForthDate,endDate).count('days')


    for (let i = 0; i < interval.count('days'); i++) {
      const currentDate = startDate.plus({ days: i })
      const colorObject = dateColors.find(({ date }) => date === currentDate.toFormat('dd.MM.yyyy'))
      dateCells.push({
        number: currentDate.day,
        color: currentDate.month !== month ? '#E2E2E2' : '',
        backgroundColor: colorObject ? colorObject.color : ''
      })
    }
    this.setState({ dateCells, activeDayIndex: ind ,switchBackIndex,switchForthIndex,activeDay:-1})
  }

  handleClickDay = (day, index) => {
    const { selectDay , incMonth, decMonth} = this.props
    selectDay(day)
    if(index <= this.state.switchBackIndex){
      decMonth()
      this.setState({
        activeDay: day,
        activeDayIndex: -1
      })

    }
    else if(index >= this.state.switchForthIndex){
      incMonth()
      this.setState({
        activeDayIndex: -1,
        activeDay: day
      })

    }
    else
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
  selectDay: PropTypes.func,
  incMonth: PropTypes.func,
  decMonth: PropTypes.func
}

CalendarContent.defaultProps = {
  year: DateTime.local().year,
  month: DateTime.local().month,
  dateColors: []
}
