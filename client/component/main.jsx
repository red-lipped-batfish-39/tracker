import React, { Component } from "react";
import { render } from "react-dom";


class Main extends Component {
 
  render() {

    return (

      <div>
      <h1>This is Main</h1>
      <label htmlFor="start"> Start Date</label>
      <input type = "date" id = "startDate" name = "start"/>

      <label htmlFor="end">End Date</label>
      <input type = "date" id = "endDate" name = "end"/>
      </div>
    );
  }
}
export default Main; 