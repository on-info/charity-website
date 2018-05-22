import React, { Component } from 'react';
import {BrowserRouter , Route , Switch } from "react-router-dom";
import './App.css';
import Home from "./Components/Home/MainPage";
import Navigation from "./Components/Navigation/Navigation";
import Error from "./Components/Error/Error";
import Admin from "./Components/Admin/Admin";

import "./App.css"

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className = "container">
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/admin-panel" component={Admin}/>
            <Route component={Error}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;