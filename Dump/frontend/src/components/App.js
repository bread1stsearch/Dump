import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Topics from './Topics';


const App = () => (
  <Topics endpoint="serialize/"/>
);
const wrapper = document.getElementById("app");

wrapper ? ReactDOM.render(<App />, wrapper) : null;