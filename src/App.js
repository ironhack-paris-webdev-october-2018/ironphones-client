import React, { Component } from 'react';
import { Switch, Route, NavLink } from "react-router-dom";

import './App.css';
import HomePage from "./components/HomePage.js";
import NotFound from "./components/NotFound.js";
import PhoneList from "./components/PhoneList.js";
import PhoneDetails from "./components/PhoneDetails.js";
import AddPhone from "./components/AddPhone.js";
import SignupPage from './components/SignupPage.js';
import LoginPage from "./components/LoginPage.js";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
    };
  }

  // this is the method for updating "currentUser"
  // (must be defined in App.js since it's the owner of "currentUser" now)
  syncCurrentUser(userDoc) {
    this.setState({ currentUser: userDoc });
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1>Ironphones</h1>

          <nav>
            <NavLink exact to="/">Home</NavLink>
            <NavLink to="/phone-list">Our Phones</NavLink>
            <NavLink to="/signup-page">Sign Up</NavLink>
            <NavLink to="/login-page">Log In</NavLink>
          </nav>
        </header>

        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/phone-list" component={PhoneList} />
          <Route path="/phone-details/:phoneId" component={PhoneDetails} />
          <Route path="/add-phone" component={AddPhone} />
          {/* Use "render" instead of "component" to pass props */}
          <Route path="/signup-page" render={() =>
            <SignupPage currentUser={this.state.currentUser}
                onUserChange={userDoc => this.syncCurrentUser(userDoc)} />
          } />
          <Route path="/login-page" render={() =>
            <LoginPage currentUser={this.state.currentUser}
                onUserChange={userDoc => this.syncCurrentUser(userDoc)} />
          } />

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
