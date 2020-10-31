import App from "./App.jsx";
//import and render app.jsx

import React from 'react';
import { render } from 'react-dom';
// import { BrowserRouter, Route, Link, Switch } from "react-router-dom";

render(
  <div>

    <App />
  </div>, 

  document.getElementById("contents")
);