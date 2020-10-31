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
      email: '',
      user: null, //starts with null, change state after user verified 
      period: [], //display to the user if data comes back
      startDate: '', 
      endDate: '', 
      loginError: '', 
      task: 'login', //task for profile to determine which component to display
    }
    this.changeTask = this.changeTask.bind(this);
    this.logout = this.logout.bind(this);
    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
    this.trackInput = this.trackInput.bind(this);
  };

  changeTask (){ //change task in login page to signup
    this.setState({
      ...this.state,
      task: 'signup'
    })
  };

  trackInput (userInputType, event) {
    //store event target (event input)
      //set state for userInput
    this.setState(
      {
        ...this.state, 
        [userInputType]: event.target.value
      }
    )
  };

  signup () {
    fetch('/api/signup', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
        email: this.state.email
      })
    })
    .then( res => res.json())
    .then( data => {
      if(data.error) {
        this.setState({
          ...this.state,
          loginError: data.error,
          username: '',
          password: '',
          email: '',
          task: 'logout'
        })
      } 
      localStorage.setItem('token', data.token)
      this.setState({
        ...this.state,
        user: data.username,
        username: '',
        password: '',
        email: '', 
      })
      
    }).catch( (err) => {
      this.setState({
        ...this.state,
        loginError: 'signup failed',
        username: '',
        password: '',
        email: '',
      })
    })
  };

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
        task: 'logout',
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
  };

  logout() {
    //delete local storage token localStorage.removeItem(token)
      //reset state
        //redirect to homepage /
    localStorage.removeItem('token')

    this.setState({
      username: '',
      password: '', 
      email: '',
      user: null, 
      period: [], 
      startDate: '', 
      endDate: '', 
      loginError: '', 
    })
  };

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
      changeTask = {this.changeTask}
      trackInput = {this.trackInput}
      login = {this.login}
      signup = {this.signup}
      logout = {this.logout}
      loginError = {this.state.loginError}
      username = {this.state.username}
      password = {this.state.password}
      email = {this.state.email}
      user = {this.state.user}
      task = {this.state.task}
      /> 
      <Main /> 
      
      </div>
    );
  }
}
export default App; 