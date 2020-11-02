import React, { Component, Profiler } from "react";
import { render } from "react-dom";



class Login extends Component {
 
  render() {
    //click button
      //fetch request
        //include body 
    
    return (
      //user name, pass, button
      <>
        <h2>Log in</h2>
        <div className="loginContainer">
          <label htmlFor="userID"> Username</label>
          <input value = {this.props.username} type="text" id="userID" name="userID"  onChange = {(e) => {this.props.trackInput('username', e)}}/>

          <label htmlFor="pwd"> Password</label>
          <input value = {this.props.password} type="password" id="pwd" name="pwd" onChange = {(e) => {this.props.trackInput('password', e)}}/><br></br>

          <button className="primaryButton" onClick = {this.props.login}>Log in </button><br></br>
          
          <button className="secondaryButton" onClick = {this.props.changeTask}>Go to sign up page</button><br></br>

          <p>{this.props.loginError}</p>

        </div>
      </>
    );
  }
}
export default Login; 