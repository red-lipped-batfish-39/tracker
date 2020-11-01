import React, { Component } from "react";
import { render } from "react-dom";


class Week extends Component {
 
  render() {
    const firstSunday = new Date(this.props.year, this.props.month, this.props.firstSundayDate)

    return (
      <div className = "calendarRow">
        <h2>This is a week</h2>
        <h3>{firstSunday.toDateString()}</h3>
      </div>
      
    );
  }
}
export default Week; 