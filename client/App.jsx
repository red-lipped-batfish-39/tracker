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
      //month, year, and date to display on the calendar (sets on component did mount, updates if user selects prev month)
      currMonthDisplay: '', 
      currYearDisplay: '',
      todayDate: '',
      showMain: false,
    }
    this.newPeriod = this.newPeriod.bind(this);
    this.changeTask = this.changeTask.bind(this);
    this.logout = this.logout.bind(this);
    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
    this.trackInput = this.trackInput.bind(this);
    this.addMonth = this.addMonth.bind(this);
    this.subtractMonth = this.subtractMonth.bind(this);
    this.setPeriodDates = this.setPeriodDates.bind(this);
  };

  componentDidMount () {
    let today = new Date();
    let currMonthDisplay = today.getMonth();
    let currYearDisplay = today.getFullYear();
    let todayDate = today.getDate();
    this.setState({
      ...this.state,
      currMonthDisplay,
      currYearDisplay,
      todayDate,
      showMain: true,
    })
  }

  changeTask (){ //change task in login page to signup or vice versa
    let task = (this.state.task === 'signup' ? 'login' : 'signup');
    this.setState({
      ...this.state,
      task,
    })
  };

  setPeriodDates (event) {
    //Goal -- change the start or end date of the period based on calendar click
    //special cases 

    // if startDate already exists, change endDate, not startDate
      // unless endDate already exists, in which case endDate should be cleared and startDate should be reset

    //if startDate already exists but the new date is before that start date, change the startDate

    let newDate = event.target.id;
    console.log('running setPeriodDates, new date is', newDate, 'event target is', event.target)
    if (
        this.state.startDate !== '' && 
        newDate < this.state.startDate
      ) {
      this.setState({
        ...this.state,
        startDate: newDate,
        endDate: ''
      })
    } else if (
        this.state.startDate !== '' && 
        this.state.endDate === ''
      ) {
      this.setState({
        ...this.state,
        endDate: newDate
      })
    } else {
      this.setState({
        ...this.state,
        startDate: newDate,
        endDate: ''
      })
    }
     
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
  };


  signup () {
    //check to see if inputs are there before fetch request
    if (!this.state.username || !this.state.password || !this.state.email){
      this.setState({
        ...this.state,
        loginError: 'Missing information in sign up',
        task: 'login',
        username: '',
        password: '',
      })
      return;
    }
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

  addMonth(){
    //new month is (currMonthDisplay + 1) % 12 
    /**example 1: 
     * current month is 10 (November) --> 
     * add 1 --> month is 11 (December) --> 
     * 11 mod 12 is 11 --> 
     * stays same
     * example 2
     * current month is 11 --> add 1 --> 12 % 12 --> 0 --> January 
     * if final month is january -- add 1 to year
    */
    let newMonth = (this.state.currMonthDisplay + 1) % 12;
    let newYear = (newMonth === 0 ? this.state.currYearDisplay + 1 : this.state.currYearDisplay);
    this.setState({
      currMonthDisplay: newMonth, 
      currYearDisplay: newYear,
    }) 
  }

  subtractMonth(){

    //new month is currMonth - 1 unless month is January (0)
    let newMonth;
    let newYear;
    if (this.state.currMonthDisplay === 0) {
      newMonth = 11;
      newYear = this.state.currYearDisplay - 1;
    } else {
      newMonth = (this.state.currMonthDisplay - 1);
    }
    this.setState({
      currMonthDisplay: newMonth, 
      currYearDisplay: newYear || this.state.currYearDisplay,
    }) 
  }

  render() {
    console.log('running render on App component, show main is', this.state.showMain, 'state is', this.state)
    const main = [];
    if (this.state.showMain === true) {
      main.push(<Main 
      user = {this.state.user}
      setPeriodDates = {this.setPeriodDates}
      newPeriod = {this.newPeriod}
      addMonth = {this.addMonth}
      subtractMonth = {this.subtractMonth}
      startDate = {this.state.startDate}
      endDate = {this.state.endDate}
      currMonthDisplay = {this.state.currMonthDisplay} 
      currYearDisplay = {this.state.currYearDisplay}
      todayDate = {this.state.todayDate}
      period = {this.state.period}
      />) 
    } 

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
      {main}
      
      </div>
    );
  }
}
export default App; 