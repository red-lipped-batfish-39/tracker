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

        <h1>Create an Account</h1>

        <label htmlFor="userIDSignup"> Input username</label>
        <input value = {this.props.username} type="text" id="userIDSignup" name="userIDSignup"  onChange = {(e) => {this.props.trackInput('username', e)}}/>

        <label htmlFor="pwdSignUp"> password</label>
        <input value = {this.props.password} type="password" id="pwdSignUp" name="pwdSignUp" onChange = {(e) => {this.props.trackInput('password', e)}}/>
        
        <label htmlFor="email"> email</label>
        <input value = {this.props.email} type="text" id="email" name="email" onChange = {(e) => {this.props.trackInput('email', e)}}/><br></br>


        <button className="primaryButton" onClick = {this.props.signup}>Create account </button><br></br>

        <button className="secondaryButton" onClick = {this.props.changeTask}>Go to log in page</button><br></br>
  
      </div>
    );
  }
}


export default Signup;