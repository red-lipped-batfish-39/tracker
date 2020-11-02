import React, { Component, Profiler } from "react";
import { render } from "react-dom";


class Logout extends Component {
  constructor(){
    super()
  }
  render() {
    return(
      <div className={"loginContainer logout"}>
        <h2>Welcome {this.props.user}! </h2>
        <button className="primaryButton" onClick = {this.props.logout}>Log out </button><br></br>
      </div>
    )
  }
}

export default Logout;