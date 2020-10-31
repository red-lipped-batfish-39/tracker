import React, { Component, Profiler } from "react";
import { render } from "react-dom";
import Login from "./login.jsx"
import Signup from "./signup.jsx"

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
      <Signup 
      trackInput = {this.props.trackInput}
      signup = {this.props.signup}
      loginError = {this.props.loginError}
      username = {this.props.username}
      password = {this.props.password}
      email = {this.props.email}
      />
      </div>
    );
  }
}
export default Profile; 