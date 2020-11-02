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
    //this checks to see if this date is covered by the start and end date in state
    let className = '';
    if (dateString === this.props.startDate || dateString === this.props.endDate) {
      className = 'highlight'
    } else if (dateString > this.props.startDate && dateString < this.props.endDate) {
      className = 'highlight'
    }

    //this checks to see if the date is in the array of period dates
    /**ISSUE NOT RESOLVED
     * this is an O(n) time complexity for every 
     * day! That means it's running O(n) operations for 
     * each day of the month for each stored 
     * date in the database.
     * Refactor to first select the year and month and only look at the stored data for that year and that month??
     * Move to a higher level component so it isn't repeated for each day?
    */
    if (this.props.period.some(object => {
      return object.startDate === dateString || object.endDate === dateString || (object.startDate < dateString && object.endDate > dateString)
    })) {
      className = 'storedHighlight';
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