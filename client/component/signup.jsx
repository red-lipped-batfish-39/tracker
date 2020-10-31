import React, { Component, Profiler } from "react";
import { render } from "react-dom";


class Signup extends Component {
  constructor(props) {
    super(props)
  }
  render () {
    return (
      //user name, pass, button
      <div className={"loginContainer"}>

      <h1>This is Signup</h1>

      <label htmlFor="userID"> Input username</label>
      <input value = {this.props.username} type="text" id="userID" name="userID"  onChange = {(e) => {this.props.trackInput('username', e)}}/>

      <label htmlFor="pwd"> password</label>
      <input value = {this.props.password} type="password" id="pwd" name="pwd" onChange = {(e) => {this.props.trackInput('password', e)}}/>
      
      <label htmlFor="email"> email</label>
      <input value = {this.props.email} type="text" id="email" name="email" onChange = {(e) => {this.props.trackInput('email', e)}}/>


      <button onClick = {this.props.signup}>Create user </button>
  
      </div>
    );
  }
}


export default Signup;