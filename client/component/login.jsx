import React, { Component, Profiler } from "react";
import { render } from "react-dom";



class Login extends Component {
 
  render() {
    //click button
      //fetch request
        //include body 
    
    return (
      //user name, pass, button
      <div className="loginContainer">

<<<<<<< HEAD
        <h4>Sign in here</h4>
        <label htmlFor="userID"> Username</label>
        <input type="text" id="userID" name="userID"  label/>
        <label htmlFor="pwd"> Password</label>
        <input type="password" id="pwd" name="pwd" />
        <button>Log In</button>
  
=======
      <h1>This is Login</h1>
      <p>{this.props.loginError}</p>

      <label htmlFor="userID"> Input username</label>
      <input value = {this.props.username} type="text" id="userID" name="userID"  onChange = {(e) => {this.props.trackInput('username', e)}}/>

      <label htmlFor="pwd"> password</label>
      <input value = {this.props.password} type="password" id="pwd" name="pwd" onChange = {(e) => {this.props.trackInput('password', e)}}/>

      <button onClick = {this.props.login}>Click me </button>
      
      <button onClick = {this.props.changeTask}>Switch to Signup </button>

>>>>>>> 14950ada866a194686f4d9e5c172c0caf65152d0
      </div>
    );
  }
}
export default Login; 