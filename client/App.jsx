import React, { Component } from "react";
import { render } from "react-dom";
// import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import Profile from "./component/profile.jsx";
import Main from "./component/main.jsx";

class App extends Component {
  constructor(props) {
    super(props); 
    this.state = {
      user: null, //starts with null, change state after user verified 
      period: [], //display to the user if data comes back
      startDate: '', 
      endDate: '', 
      
    }
  }
  render() {

    return (
      //render profile & name 
      <div>
      <Profile/> 
      <Main /> 
      </div>
    );
  }
}
export default App; 