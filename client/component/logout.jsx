import React, { Component, Profiler } from "react";
import { render } from "react-dom";


class Logout extends Component {
  constructor(){
    super()
  }
  render() {
    return(
      <div>
      <h4>Welcome {this.props.user}! </h4>
      <button onClick = {this.props.logout}>Logout </button>
      </div>
    )
  }
}

export default Logout;