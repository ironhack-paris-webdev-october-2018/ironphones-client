import React, { Component } from 'react';
import { Switch, Route, NavLink } from "react-router-dom";

import './App.css';
import HomePage from "./components/HomePage.js";
import NotFound from "./components/NotFound.js";
import PhoneList from "./components/PhoneList.js";
import PhoneDetails from "./components/PhoneDetails.js";
import AddPhone from "./components/AddPhone.js";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <h1>Ironphones</h1>

          <nav>
            <NavLink exact to="/">Home</NavLink>
            <NavLink to="/phone-list">Our Phones</NavLink>
          </nav>
        </header>

        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/phone-list" component={PhoneList} />
          <Route path="/phone-details/:phoneId" component={PhoneDetails} />
          <Route path="/add-phone" component={AddPhone} />

          {/* 404 route LAST */}
          <Route component={NotFound} />
        </Switch>

        <footer>
          <p>Made with 📱 at Ironhack</p>
        </footer>
      </div>
    );
  }
}

export default App;
