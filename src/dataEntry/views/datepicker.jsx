import React from 'react'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import { SingleDatePicker } from 'react-dates'
import moment from 'moment'

// MyDatePicker 组件的 value, onChange 是 由 rc-form 的 getFieldDecorator 传入.
class MyDatePicker extends React.Component {
  constructor (props) {
    super(props)
    this.state = { date: moment(new Date()), focused: false }
  }

  handleDateChange = date => {
    const handleDateChange = this.props.onChange;
    this.setState({date});
    handleDateChange(date);
  }

  render () {
    return (
      <SingleDatePicker
        numberOfMonths={1}
        isOutsideRange={() => {}}
        date={this.state.date}
        onDateChange={this.handleDateChange}
        focused={this.state.focused}
        onFocusChange={({focused}) => this.setState({focused})}
        id='datepicker'
      />
    )
  }
}

export default MyDatePicker
