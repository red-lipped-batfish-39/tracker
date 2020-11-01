import React, { Component } from "react";
import { render } from "react-dom";


class Day extends Component {
 
  render() {
    const today = new Date(this.props.year, this.props.month, this.props.date);
    return (
      <div className="dayBox" key={today.toDateString()} id={today.toDateString()}>
        <p>{this.props.date}</p>
      </div>
      
    );
  }
}
export default Day; 