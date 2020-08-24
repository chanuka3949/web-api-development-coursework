import React, { Component } from "react";
import Fade from "react-reveal/Fade";

class Phone extends Component {
  state = {};
  render() {
    return (
      <div>
        <Fade bottom cascade>
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
              className="img-fluid"
              src={this.props.phone.imgUrl}
              alt=""
              style={{
                display: "block",
                margin: "0px auto 10px",
                maxHeight: "200px",
              }}
            />

            <div className="card-body">
              <h5 className="card-title">{this.props.phone.name}</h5>
              <h4 className="card-text">
                ${""} {this.props.phone.price}
              </h4>
              <button className="btn btn-outline-success float-left">
                View Details
              </button>
              <button
                className="btn btn-primary float-right"
                onClick={this.props.onaddToCart}
              >
                Add To Cart
              </button>
            </div>
          </div>
        </Fade>
      </div>
    );
  }
}

export default Phone;
