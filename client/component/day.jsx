import React, { Component } from "react";
import { render } from "react-dom";


class Day extends Component {
  
  render() {
    //using the year month and date passed down, make a date object (today)
    const today = new Date(this.props.year, this.props.month, this.props.date);

    //convert date object to an ISO string and slice only YYYY-MM-DD
    let dateString = today.toISOString().slice(0, 10);
    
    //if the dateString is in the period List OR is the current start or end date -- it should be highlighted. 
    //we will accomplish that with a different className
    let className = '';
    if (dateString === this.props.startDate || dateString === this.props.endDate) {
      className = 'highlight'
    } else if (dateString > this.props.startDate && dateString < this.props.endDate) {
      className = 'highlight'
    }
    return (
      <div
        className="dayBox" 
      >
        <p
          key={dateString} 
          id={dateString}
          //add class for bg color
          className = {className}
          onClick = {this.props.setPeriodDates}
        >
          {this.props.date}
        </p>
      </div>
      
    );
  }
}
export default Day; 