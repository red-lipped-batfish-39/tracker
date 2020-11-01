import React, { Component } from "react";
import { render } from "react-dom";
import DayLabel from "./dayLabel.jsx"
import Week from "./week.jsx"

class Month extends Component {
  

  render() {
    const daysStorage = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat']
    const monthsStorage = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    let today = new Date(); //returns Day Mon DD YYYY HH:MM:SS GMT-0800 
    let day = today.getDay(); //return 0 - 6 represent Sunday - Saturday, typeof is a number
    let year = today.getFullYear(); //gets year as a number 
    let month = today.getMonth(); //gets month as a number 0 -11
    let date = today.getDate(); //gets date as a number 1-31
    let dateString = today.toDateString(); //gets today's date in format "Day MMM DD YYYY"
    let firstDayOfMonth = new Date(year, month, 1);
    
    
    
    

    //create array of dayLabel components for each day of week
    const dayLabels = daysStorage.map((el, i) => {
      
      return (
        <DayLabel dayOfWeek = {el} key={`day:${el}month:${month}`}/>
      )
    });

    //to get a complete week, start at the Sunday of the week even if it's in the last month
    const calcFirstSunday = (firstDayOfMonth) => {
      let dayOfFirstDayOfMonth = firstDayOfMonth.getDay(); //will be a number from 0 to 6;
      if (dayOfFirstDayOfMonth === 0) return firstDayOfMonth; //if 0, we've reached sunday, stop
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() - 1); //else reduce the date by 1 day
      return calcFirstSunday(firstDayOfMonth); //invoke function recursively until 0 is reached
    };

    //calculate the first sunday -- either the beginning of the month or the last sunday of the prev month
    const firstSunday = calcFirstSunday(firstDayOfMonth);

    //create 5 weeks -- each week will contain the start date, a date object representing the sunday at the start of that week
    const weeks = [];
    for (let i = 0; i < 5; i++){
      weeks.push(<Week key={`dd:${firstSunday.getDate()}mm:${firstSunday.getMonth()}`} firstSundayDate = {firstSunday.getDate()} month = {firstSunday.getMonth()} week={i} year={firstSunday.getFullYear()}/>);
      firstSunday.setDate(firstSunday.getDate() + 7);
    }

    return (
      <>
        <div className ="calendarHeading">
          <h2>Your period calendar</h2>
          <h3>{monthsStorage[month]}</h3>
        </div>
        <div className="calendar">
          <div className="calendarRow daysRow">
            {dayLabels}
          </div>
          {weeks}
        </div>
        
        
      </>
    );
  }
}
export default Month; 