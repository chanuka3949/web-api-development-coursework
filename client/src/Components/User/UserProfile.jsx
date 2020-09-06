import React, { Component } from "react";
import { withAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import axios from "axios";
import Loading from "../Loading";
import { CountryDropdown } from "react-country-region-selector";
import { toast } from "react-toastify";
import NavBar from "../NavBar";

class UserProfile extends Component {
  state = {
    picture: "",
    name: "",
    address1: "",
    address2: "",
    city: "",
    country: "",
    state: "",
    contactNumber: "",
    postalCode: "",
  };

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
      name: "",
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
    this.getProfileData();
  }
  getProfileData() {
    axios
      .get(`http://localhost:5000/api/users/${this.props.match.params.id}`)
      .then(
        (response) => {
          if (typeof response.data.address === "undefined") {
            this.setState({
              picture: response.data.picture,
              email: response.data.email,
              name: response.data.name,
            });
          } else {
            this.setState({
              picture: response.data.picture,
              email: response.data.email,
              name: response.data.name,
              address1: response.data.address.address1,
              address2: response.data.address.address2,
              city: response.data.address.city,
              country: response.data.address.country,
              state: response.data.address.state,
              contactNumber: response.data.address.contactNumber,
              postalCode: response.data.address.postalCode,
            });
          }
        },
        (error) => {
          toast.error(error.message);
        }
      );
  }
  saveUserDetails() {
    const { user } = this.props.auth0;
    let userData = {
      name: this.state.name,
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
        userData
      )
      .then(
        (response) => {
          toast.info("User Details Updated");
        },
        (error) => {
          this.getProfileData();
          toast.error(error.message);
        }
      );
  }

  render() {
    const { country } = this.state;
    return (
      <React.Fragment>
        <div>
          <NavBar />
        </div>
        <div className="card-deck">
          <div
            className="card border-0"
            style={{ maxWidth: "20rem", marginLeft: 300, marginTop: 100 }}
          >
            <img className="card-img-top" src={this.state.picture} alt="User" />
          </div>

          <div className="card" style={{ marginTop: 100, marginRight: 300 }}>
            <div className="card-body">
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">Email</span>
                </div>
                <label className="form-control">{this.state.email}</label>
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">Name</span>
                </div>
                <input
                  value={this.state.name}
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  name="name"
                  onChange={this.handleInput}
                />
              </div>
              <h6 className="card-title">Shipping Address</h6>
              <div className="input-group mb-3">
                <input
                  value={this.state.address1}
                  type="text"
                  className="form-control"
                  placeholder="Address 1"
                  name="address1"
                  onChange={this.handleInput}
                />
              </div>
              <div className="input-group mb-3">
                <input
                  value={this.state.address2}
                  type="text"
                  className="form-control"
                  placeholder="Address 2"
                  name="address2"
                  onChange={this.handleInput}
                />
              </div>
              <div className="input-group mb-3">
                <input
                  value={this.state.city}
                  type="text"
                  className="form-control"
                  placeholder="City"
                  name="city"
                  onChange={this.handleInput}
                />
                <input
                  value={this.state.state}
                  type="text"
                  className="form-control"
                  placeholder="State"
                  name="state"
                  onChange={this.handleInput}
                />
                <CountryDropdown
                  className="custom-select"
                  value={country}
                  onChange={(val) => this.selectCountry(val)}
                />
              </div>
              <div className="input-group mb-3">
                <input
                  value={this.state.postalCode}
                  type="text"
                  className="form-control"
                  placeholder="Postal Code"
                  name="postalCode"
                  onChange={this.handleInput}
                />
                <input
                  value={this.state.contactNumber}
                  type="text"
                  className="form-control"
                  placeholder="Contact Number"
                  name="contactNumber"
                  onChange={this.handleInput}
                />
              </div>
              <div className="btn-group mr-2 float-right" role="group">
                <button
                  type="button"
                  className="btn btn btn-success float-right"
                  onClick={() => {
                    this.saveUserDetails();
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
        </div>
      </React.Fragment>
    );
  }
}

export default withAuth0(
  withAuthenticationRequired(UserProfile, {
    onRedirecting: () => <Loading />,
  })
);
