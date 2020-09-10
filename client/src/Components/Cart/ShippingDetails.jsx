import React, { Component } from "react";
import { CountryDropdown } from "react-country-region-selector";
import { toast } from "react-toastify";
import axios from "axios";
import { withAuth0 } from "@auth0/auth0-react";

class ShippingDetails extends Component {
  state = {
    userId: "",
    address1: "",
    address2: "",
    city: "",
    country: "",
    state: "",
    contactNumber: "",
    postalCode: "",
  };

  saveShippingDetails() {
    const { user } = this.props.auth0;
    let addressData = {
      address: {
        address1: this.state.address1,
        address2: this.state.address2,
        city: this.state.city,
        country: this.state.country,
        state: this.state.state,
        contactNumber: this.state.contactNumber,
        postalCode: this.state.postalCode,
      },
    };
    axios
      .put(
        `http://localhost:5000/api/users/${user.sub.split("|", 2)[1]}`,
        addressData
      )
      .then(
        (response) => {
          toast.success("Shipping Address Updated");
        },
        (error) => {
          if (error.response) {
            toast.error(error.response.data.message);
            this.getShippingDetails();
          }
        }
      );
  }
  getShippingDetails() {
    const { user } = this.props.auth0;
    const uid = user.sub.split("|", 2)[1];
    axios.get(`http://localhost:5000/api/users/${uid}`).then(
      (response) => {
        if (typeof response.data.address === "undefined") {
          return;
        }
        this.setState({
          address1: response.data.address.address1,
          address2: response.data.address.address2,
          city: response.data.address.city,
          country: response.data.address.country,
          state: response.data.address.state,
          contactNumber: response.data.address.contactNumber,
          postalCode: response.data.address.postalCode,
        });
      },
      (error) => {
        toast.error(error.message);
      }
    );
  }

  selectCountry(val) {
    this.setState({ country: val });
  }
  handleInput = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  };
  clearInputs = () => {
    this.setState({
      address1: "",
      address2: "",
      city: "",
      country: "",
      state: "",
      contactNumber: "",
      postalCode: "",
    });
  };
  componentDidMount() {
    this.getShippingDetails();
  }

  render() {
    return (
      <div className="card" style={{ marginTop: 100 }}>
        <div className="card-body">
          <h6 className="card-title">Shipping Address</h6>
          <div className="input-group mb-3">
            <input
              value={this.state.address1}
              name="address1"
              type="text"
              className="form-control"
              placeholder="Address 1"
              onChange={this.handleInput}
            />
          </div>
          <div className="input-group mb-3">
            <input
              value={this.state.address2}
              name="address2"
              type="text"
              className="form-control"
              placeholder="Address 2"
              onChange={this.handleInput}
            />
          </div>
          <div className="input-group mb-3">
            <input
              value={this.state.city}
              name="city"
              type="text"
              className="form-control"
              placeholder="City"
              onChange={this.handleInput}
            />
            <input
              value={this.state.state}
              name="state"
              type="text"
              className="form-control"
              placeholder="State"
              onChange={this.handleInput}
            />
          </div>
          <div className="input-group mb-3">
            <CountryDropdown
              className="custom-select"
              value={this.state.country}
              onChange={(val) => this.selectCountry(val)}
            />
            <input
              value={this.state.postalCode}
              name="postalCode"
              type="text"
              className="form-control"
              placeholder="Postal Code"
              onChange={this.handleInput}
            />
          </div>
          <div className="input-group mb-3">
            <input
              value={this.state.contactNumber}
              name="contactNumber"
              type="text"
              className="form-control"
              placeholder="Contact Number"
              onChange={this.handleInput}
            />
          </div>
          <div className="btn-group mr-2 float-right" role="group">
            <button
              type="button"
              className="btn btn btn-success float-right"
              onClick={() => {
                this.saveShippingDetails();
              }}
            >
              Save
            </button>
          </div>
          <div className="btn-group mr-2 float-right" role="group">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={this.clearInputs}
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default withAuth0(ShippingDetails);
