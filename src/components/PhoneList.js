import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function getPhoneUrl(onePhone) {
  return `/phone-details/${onePhone._id}`;
}

class PhoneList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // initial array is empty while we are waiting for the API results
      phoneArray: [],
    };
  }

  // React will call "componentDidMount()" automatically when PhoneList loads
  componentDidMount() {
    // retrieve the info from the API as soon as the component loads
    axios.get("http://localhost:5555/api/phones")
      .then(response => {
        console.log("Phone List", response.data);
        // update our state array with the data from the API
        this.setState({ phoneArray: response.data });
      })
      .catch(err => {
        console.log("Phone List ERROR", err);
        alert("Sorry! Something went wrong.");
      });
  }

  render() {
    const { phoneArray } = this.state;
    return (
      <section className="PhoneList">
        <h2>Our Phones</h2>

        <Link to="/add-phone">Add Your Phone</Link>

        <ul>
          {phoneArray.map(onePhone => {
            return (
              <li key={onePhone._id}>
                <h3>
                  <Link to={getPhoneUrl(onePhone)}>
                    {onePhone.model}
                  </Link>
                </h3>
                <p>by {onePhone.brand}</p>
                <p>€{onePhone.price}</p>
                <img src={onePhone.image} alt={onePhone.model} />
              </li>
            );
          })}
        </ul>
      </section>
    );
  }
}

export default PhoneList;
