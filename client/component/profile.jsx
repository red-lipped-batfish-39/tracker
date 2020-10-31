import React, { Component, Profiler } from "react";
import { render } from "react-dom";
import Login from "./login.jsx"
import Signup from "./signup.jsx"
import Logout from "./logout.jsx"
class Profile extends Component {
 
  render() {
    let component;
    let task = this.props.task;
    if(task === 'login') {
      component = 
      <Login 
      trackInput = {this.props.trackInput}
      login = {this.props.login}
      loginError = {this.props.loginError}
      username = {this.props.username}
      password = {this.props.password}
      changeTask = {this.props.changeTask}
      />
    }
    if(task === 'signup') {
      component = 
      <Signup 
      trackInput = {this.props.trackInput}
      signup = {this.props.signup}
      loginError = {this.props.loginError}
      username = {this.props.username}
      password = {this.props.password}
      email = {this.props.email}
      />
    }
    if(task === 'logout') {
      component = 
      <Logout
      logout = {this.props.logout}
      user = {this.props.user}
      />
    }

    return (

      <div>
      <h1>This is Profile</h1>

      {component}

      </div>
    );
  }
}
export default Profile; 