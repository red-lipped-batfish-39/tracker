import React, { Component } from "react";
import { render } from "react-dom";
// import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import Profile from "./component/profile.jsx";
import Main from "./component/main.jsx";
import './static/styles.scss';

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
      startDate: '',
      endDate: '', 

    }
    this.newPeriod = this.newPeriod.bind(this);
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
      // console.log('this is trackinput',userInputType, event.target.value)
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
          task: 'login'
        })
      } 
      localStorage.setItem('token', data.token)
      this.setState({
        ...this.state,
        user: data.username,
        username: '',
        password: '',
        email: '', 
        task: 'logout',
      })
      
    }).catch( (err) => {
      this.setState({
        ...this.state,
        loginError: 'signup failed',
        username: '',
        password: '',
        email: '',
        task: 'login',
      })
    })
  };

  login () {
    //check to see if inputs are there
    if (!this.state.username || !this.state.password){
      this.setState({
        ...this.state,
        loginError: 'Missing information',
        username: '',
        password: '',
      })
      return;
    }
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
      // console.log('this is login data', data)
      if(data.err) {
        throw new Error('fetch fail')
      }
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

  newPeriod () { //inside main after LOGIN success

    let token = localStorage.getItem('token')
    let replacedEndDate; 
    if(this.state.endDate === '') {
      replacedEndDate = this.state.startDate //if no declared end date, set it to startDate
    } else {
      replacedEndDate = this.state.endDate //set temp variable to endDate, send declared variable in json
    }
    fetch('/api/period', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        //send token
          //start date
            //end date, if non set to same as start
        token,
        startDate: this.state.startDate,
        endDate: replacedEndDate
      })
    })
    .then( res => res.json())
    .then( data => {
      //check if data has periods property
        //if no periods, send the user "error: dates not saved", no end or start date
          //reset start & end date
      if(!data.period) {
        throw new Error('Error: dates not saved')
      }
      //if there is periods prop
        //we set new state for period
          //replace start & end date in state
      this.setState({
        ...this.state,
        period: data.periods,
        startDate: '',
        endDate: '',
      })
    })
    .catch( (err) => {
      this.setState({
        ...this.state,
        startDate: '',
        endDate: '',
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
      task: 'login',
      startDate: '',
      endDate: '', 
    })
  };

  componentDidUpdate() {
    // console.log(this.state)
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
      <Main 
      trackInput = {this.trackInput}
      newPeriod = {this.newPeriod}
      startDate = {this.state.startDate}
      endDate = {this.state.endDate}
      /> 
      
      </div>
    );
  }
}
export default App; 