import React, { Component } from "react";
import { render } from "react-dom";


class DayLabel extends Component {
 
  constructor(props) {
    super(props)
  };

  render() {

    return (
      <div className="dayOfWeek">
        <h3>{this.props.dayOfWeek}</h3>
      </div>
      
    );
  }
}
export default DayLabel; 