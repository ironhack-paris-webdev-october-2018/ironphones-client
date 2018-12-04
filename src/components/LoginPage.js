import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      originalPassword: "",
      currentUser: null,
    };
  }

  genericSync(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();

    axios.post("http://localhost:5555/api/login", this.state)
      .then(response => {
        console.log("Login Page", response.data);
        const { userDoc } = response.data;
        this.setState({ currentUser: userDoc });
      })
      .catch(err => {
        console.log("Login Page ERROR", err);
        alert("Sorry! Something went wrong.");
      });
  }

  render() {
    if (this.state.currentUser) {
      return <Redirect to="/phone-list" />
    }

    return (
      <section className="LoginPage">
        <h2>Log In</h2>

        <form onSubmit={event => this.handleSubmit(event)}>
          <label>
            Email:
            <input value={this.state.email}
                onChange={event => this.genericSync(event)}
                type="email" name="email" placeholder="rey@jedi.com" />
          </label>

          <label>
            Password:
            <input value={this.state.originalPassword}
                onChange={event => this.genericSync(event)}
                type="password" name="originalPassword" placeholder="****" />
          </label>

          <button>Log In</button>
        </form>
      </section>
    );
  }
}

export default LoginPage;
