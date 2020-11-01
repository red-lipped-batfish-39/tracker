import React, { Component, Profiler } from "react";
import { render } from "react-dom";


class Logout extends Component {
  constructor(){
    super()
  }
  render() {
    return(
      <div className={"loginContainer"}>
        <h3>Welcome {this.props.user}! </h3>
        <button className="primaryButton" onClick = {this.props.logout}>Log out </button><br></br>
      </div>
    )
  }
}

export default Logout;