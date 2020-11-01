import React, { Component } from "react";
import { render } from "react-dom";
import Day from "./day.jsx"

class Week extends Component {
 
  render() {
    let currDate = new Date(this.props.year, this.props.month, this.props.firstSundayDate)

    //create array of 7 day components, passing in the correct date info to each -- note date object cannot be passed as a prop? error message?
    //provide react a unique key -- week # day # month #
    const days = [];
    for (let i = 0; i < 7; i++ ) {
      console.log(currDate.getDay());
      console.log(currDate.toDateString())
      days.push(<Day key={`week:${this.props.week},day:${i},month: ${this.props.month}`} year = {currDate.getFullYear()} month={currDate.getMonth()} date = {currDate.getDate()}/>);
      currDate.setDate(currDate.getDate() + 1);
      
    }

    return (
      <div className = "calendarRow">
        {days}
      </div>
      
    );
  }
}
export default Week; 