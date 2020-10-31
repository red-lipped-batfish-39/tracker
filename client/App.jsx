import React, { Component } from "react";
import { render } from "react-dom";
// import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import Profile from "./component/profile.jsx";
import Main from "./component/main.jsx";

class App extends Component {
  constructor(props) {
    super(props); 
    this.state = {
      username: '',
      password: '', 
      user: null, //starts with null, change state after user verified 
      period: [], //display to the user if data comes back
      startDate: '', 
      endDate: '', 
      loginError: '', 
    }
    this.login = this.login.bind(this);
    this.trackInput = this.trackInput.bind(this);
  }
  trackInput (userInputType, event) {
    //store event target (event input)
      //set state for userInput
    this.setState(
      {
        ...this.state, 
        [userInputType]: event.target.value
      }
    )
  }

  login () {
    fetch('/api/login', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    })
    .then( res => res.json())
    .then( data => {
      if(data.error) {
        //send error based on user or pass
          //send login error message
        this.setState({
          ...this.state,
          loginError: data.error,
          username: '',
          password: '',
        })
      } 
      //set local storage (token)
        //localStorage.setItem with token
          //access with localStorage.getItem(token)
      //add jwt to local storage
        //setState to user passed back by server
          //setUser * password state to empty string ''
      localStorage.setItem('token', data.token)
      this.setState({
        ...this.state,
        user: data.username,
        username: '',
        password: '',
      })
      
      //response: JWT, username body or ERR?
      /*{token: jwt OR null, username: username OR null, error: “The user does not exist” OR “The password was incorrect”} */
    }).catch( (err) => {
      this.setState({
        ...this.state,
        loginError: 'login failed',
        username: '',
        password: '',
      })
    })
  }

  componentDidUpdate() {
    console.log(this.state)
  }

  render() {
    // localStorage.setItem('token', 'aaaaa.ccccc.bbbbb')
      //testing local storage to show up in console

    return (
      //render profile & name 
      <div>
      <Profile
      trackInput = {this.trackInput}
      login = {this.login}
      loginError = {this.state.loginError}
      username = {this.state.username}
      password = {this.state.password}
      /> 
      <Main /> 
      </div>
    );
  }
}
export default App; 