import React, { Component, Profiler } from "react";
import { render } from "react-dom";



class Login extends Component {
 
  render() {

    return (
      //user name, pass, button
      <div className="loginContainer">

        <h4>Sign in here</h4>
        <label htmlFor="userID"> Username</label>
        <input type="text" id="userID" name="userID"  label/>
        <label htmlFor="pwd"> Password</label>
        <input type="password" id="pwd" name="pwd" />
        <button>Log In</button>
  
      </div>
    );
  }
}
export default Login; 