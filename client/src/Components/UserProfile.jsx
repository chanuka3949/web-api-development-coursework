import React, { Component } from "react";
import { withAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import axios from "axios";
import Loading from "./Loading";
import { CountryDropdown } from "react-country-region-selector";

class UserProfile extends Component {
  state = {
    // name: this.props.auth0.user.name,
    // email: this.props.auth0.user.email,
    // uid: this.props.auth0.user.sub.split("|", 2)[1],
    // imgURL: this.props.auth0.user.picture,
    userData: {},
    name: "",
    address1: "",
    address2: "",
    city: "",
    country: "",
    state: "",
    contactNumber: "",
    postalCode: "",
  };
  async componentDidMount() {
    try {
      let { data } = await axios.get(
        `http://localhost:5000/api/users/${this.props.match.params.id}`
      );
      this.setState({ userData: data, name: data.name });
    } catch (e) {
      console.log(e.message);
    }
  }
  selectCountry(val) {
    this.setState({ country: val });
  }
  render() {
    const { country } = this.state;
    return (
      <React.Fragment>
        <div className="card-deck">
          <div
            className="card border-0"
            style={{ maxWidth: "20rem", marginLeft: 300, marginTop: 100 }}
          >
            <img
              className="card-img-top"
              src={this.state.userData.picture}
              alt="User"
            />
          </div>

          <div className="card" style={{ marginTop: 100, marginRight: 300 }}>
            <div className="card-body">
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">Email</span>
                </div>
                <label className="form-control">
                  {this.state.userData.email}
                </label>
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">Name</span>
                </div>
                <input
                  value={this.state.name}
                  type="text"
                  className="form-control"
                />
              </div>
              <h6 className="card-title">Shipping Address</h6>
              <div className="input-group mb-3">
                <input
                  value={this.state.address1}
                  type="text"
                  className="form-control"
                  placeholder="Address 1"
                />
              </div>
              <div className="input-group mb-3">
                <input
                  value={this.state.address2}
                  type="text"
                  className="form-control"
                  placeholder="Address 2"
                />
              </div>
              <div className="input-group mb-3">
                <input
                  value={this.state.city}
                  type="text"
                  className="form-control"
                  placeholder="City"
                />
                <input
                  value={this.state.state}
                  type="text"
                  className="form-control"
                  placeholder="State"
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
                />
                <input
                  value={this.state.contactNumber}
                  type="text"
                  className="form-control"
                  placeholder="Contact Number"
                />
              </div>
              <div className="btn-group mr-2 float-right" role="group">
                <button
                  type="button"
                  className="btn btn btn-success float-right"
                >
                  Save
                </button>
              </div>
              <div className="btn-group mr-2 float-right" role="group">
                <button type="button" className="btn btn-outline-secondary">
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
