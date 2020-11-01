import React, { Component } from "react";
import { render } from "react-dom";


class Main extends Component {
 
  render() {
    console.log('this.props.user is ', this.props.user)
    if (!this.props.user) {
      return <></>
    }

    return (

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
    );
  }
}
export default Main; 