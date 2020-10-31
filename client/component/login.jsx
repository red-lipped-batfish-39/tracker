import React, { Component, Profiler } from "react";
import { render } from "react-dom";



class Login extends Component {
 
  render() {

    return (
      //user name, pass, button
      <div>

      <h1>This is Login</h1>


      <label htmlFor="userID"> Input username</label>
      <input type="text" id="userID" name="userID"  label/>
      <label htmlFor="pwd"> password</label>
      <input type="password" id="pwd" name="pwd" />
      <button>Click me </button>
  
      </div>
    );
  }
}
export default Login; 