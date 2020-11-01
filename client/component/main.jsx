import React, { Component } from "react";
import { render } from "react-dom";
import Month from "./month.jsx"


class Main extends Component {
 
  render() {
    //don't display component if user is not defined
    if (!this.props.user) {
      return <Month />
    }

    return (
      <>
      <div class="periodInputContainer">
        <h1>Add new period</h1>
        <label htmlFor="start"> Start Date</label>
        <input type = "date" id = "startDate" name = "start" 
          onChange = {(e) => {this.props.trackInput('startDate', e)}}
        /><br></br>

        <label htmlFor="end">End Date</label>
        <input type = "date" id = "endDate" name = "end"
          onChange = {(e) => {this.props.trackInput('endDate', e)}}
        /><br></br>
        <button className ="primaryButton" onClick = {this.props.newPeriod}>Submit these dates</button><br></br>
      </div>
      <Month />
      </>
    );
  }
}
export default Main; 