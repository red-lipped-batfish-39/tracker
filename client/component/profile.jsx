import React, { Component, Profiler } from "react";
import { render } from "react-dom";
import Login from "./login.jsx"

class Profile extends Component {
 
  render() {

    return (

      <div>
      <h1>This is Profile</h1>
      <Login />
      </div>
    );
  }
}
export default Profile; 