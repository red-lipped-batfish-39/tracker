import React, { Component } from "react";
import { render } from "react-dom";
import Month from "./month.jsx"


class Main extends Component {
 
  render() {

    // //don't display component if user is not defined
    // if (!this.props.user) {
    //   return <> </>
    // }

    //to get a complete week, start at the Sunday of the week even if it's in the last month
    const calcFirstSunday = (firstDayOfMonth) => {
      let dayOfFirstDayOfMonth = firstDayOfMonth.getDay(); //will be a number from 0 to 6;
      if (dayOfFirstDayOfMonth === 0) return firstDayOfMonth; //if 0, we've reached sunday, stop
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() - 1); //else reduce the date by 1 day
      return calcFirstSunday(firstDayOfMonth); //invoke function recursively until 0 is reached
    };

    //calculate first day of current month
    const firstDayOfMonth = new Date(this.props.currYearDisplay, this.props.currMonthDisplay, 1);


    //calculate the first sunday -- either the beginning of the month or the last sunday of the prev month
    const firstSunday = calcFirstSunday(firstDayOfMonth);


    return (
      <>
      {/* <div class="periodInputContainer">
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
      </div> */}
      <Month 
        firstSundayDate = {firstSunday.getDate()} 
        firstSundayMonth = {firstSunday.getMonth()} 
        firstSundayYear = {firstSunday.getFullYear()} 
        month = {this.props.currMonthDisplay}
        year = {this.props.currYearDisplay} 
        addMonth = {this.props.addMonth} 
        subtractMonth = {this.props.subtractMonth}
        setPeriodDates = {this.props.setPeriodDates}
        period = {this.props.period}
        startDate = {this.props.startDate}
        endDate = {this.props.endDate}
        newPeriod = {this.props.newPeriod}
        deletePeriod = {this.props.deletePeriod}
        stageForUpdateOrDelete = {this.props.stageForUpdateOrDelete}
        storedStart = {this.props.storedStart}
      />
      
      </>
    );
  }
}
export default Main; 