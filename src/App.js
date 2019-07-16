import React, { Component } from 'react'
import Calendar from './components/Calendar'
import { DateTime } from 'luxon'
import styles from './App.css'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentDate: DateTime.local(),
      dateColors: [{
        date: '06.07.2019',
        color: '#0f0'
      },
      {
        date: '18.07.2019',
        color: '#00f'
      }]
    }
  }

  onIncMonth = () => {
    const { currentDate } = this.state
    this.setState({
      currentDate: currentDate.plus({ months: 1 })
    }, () => console.log(`Current month: ${this.state.currentDate.monthLong}`))
  }

  onDecMonth = () => {
    const { currentDate } = this.state
    this.setState({
      currentDate: currentDate.minus({ months: 1 })
    }, () => console.log(`Current month: ${this.state.currentDate.monthLong}`))
  }

  onSelectDay = (dayIndex) => {
    console.log(`Selected day: ${dayIndex}`)
  }

  render() {
    const { currentDate, dateColors } = this.state
    return (
      <div className={styles.app}>
        <Calendar
          year={currentDate.year}
          month={currentDate.month}
          dateColors={dateColors}
          incMonth={this.onIncMonth}
          decMonth={this.onDecMonth}
          selectDay={this.onSelectDay}
        />
      </div>
    )
  }
}