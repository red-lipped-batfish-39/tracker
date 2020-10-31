import React, { Component, Profiler } from "react";
import { render } from "react-dom";
import Login from "./login.jsx"

class Profile extends Component {
 
  render() {


    return (

      <div>
      <h1>This is Profile</h1>
      <Login 
      trackInput = {this.props.trackInput}
      login = {this.props.login}
      loginError = {this.props.loginError}
      username = {this.props.username}
      password = {this.props.password}
      />
      </div>
    );
  }
}
export default Profile; 