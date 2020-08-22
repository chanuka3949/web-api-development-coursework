import React, { Component } from "react";

class Phone extends Component {
  state = {};
  render() {
    return (
      <div
        className="card"
        style={{
          borderColor: "gray",
          minWidth: "18rem",
          maxWidth: "18rem",
          marginBottom: 60,
        }}
      >
        <img
          src={this.props.phone.imgUrl}
          className="card-img-top"
          alt="pictureDetails"
          style={{ width: "100%", height: "14rem", objectFit: "cover" }}
        />
        <div className="card-body">
          <h5 className="card-title">{this.props.phone.name}</h5>
          <h4 className="card-text">{this.props.phone.price}</h4>
          <button className="btn btn-outline-success float-left">
            View Details
          </button>
          <button className="btn btn-primary float-right">Add To Cart</button>
        </div>
      </div>
    );
  }
}

export default Phone;
