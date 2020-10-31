import React, { Component, Profiler } from "react";
import { render } from "react-dom";



class Login extends Component {
 
  render() {
    //click button
      //fetch request
        //include body 
    
    return (
      //user name, pass, button
      <div>

      <h1>This is Login</h1>
      <p>{this.props.loginError}</p>

      <label htmlFor="userID"> Input username</label>
      <input value = {this.props.username} type="text" id="userID" name="userID"  onChange = {(e) => {this.props.trackInput('username', e)}}/>

      <label htmlFor="pwd"> password</label>
      <input value = {this.props.password} type="password" id="pwd" name="pwd" onChange = {(e) => {this.props.trackInput('password', e)}}/>

      <button onClick = {this.props.login}>Click me </button>
      
      <button onClick = {this.props.changeTask}>Switch to Signup </button>

      </div>
    );
  }
}
export default Login; 