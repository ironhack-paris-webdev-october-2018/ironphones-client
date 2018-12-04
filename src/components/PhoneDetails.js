import React, { Component } from "react";
import axios from "axios";

class PhoneDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // we need the initial "specs" array to avoid an error with ".map()"
      specs: [],
    };
  }

  // React will call "componentDidMount()" automatically when PhoneDetails loads
  componentDidMount() {
    const { params } = this.props.match;
    // retrieve the info from the API as soon as the component loads
    axios.get(
      `http://localhost:5555/api/phones/${params.phoneId}`,
      { withCredentials: true }, // FORCE axios to send cookies across domains
    )
      .then(response => {
        console.log("Phone Details", response.data);
        // update our state object with the data from the API
        this.setState(response.data);
      })
      .catch(err => {
        console.log("Phone Details ERROR", err);
        alert("Sorry! Something went wrong.");
      });
  }

  render() {
    const { _id, brand, model, price, image, specs, createdAt } = this.state;
    return (
      <section className="PhoneDetails">
        <h2>Phone Details</h2>

        <h3>{model}</h3>
        <p>by <i>{brand}</i></p>
        <b>€{price}</b>

        <img src={image} alt={model} />

        <h4>Specs</h4>
        <ul>
          {specs.map((oneSpec, index) => {
            return <li key={index}>{oneSpec}</li>;
          })}
        </ul>

        <p>Product no. {_id}</p>
        <p>Added on {createdAt}</p>
      </section>
    );
  }
}

export default PhoneDetails;
