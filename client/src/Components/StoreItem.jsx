import React, { Component } from "react";
import Fade from "react-reveal/Fade";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";

class Phone extends Component {
  state = {};

  openModal = (Phone) => {
  //  console.log(Phone);
    this.setState({ Phone });
  };

  closeModal = () => {
    this.setState({ Phone: null });
  };

  render() {
    const { Phone } = this.state;
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
              <button
                className="btn btn-outline-success float-left"
                onClick={() => this.openModal(this.props.phone._id)}
              >
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

        {Phone && (
          <Modal isOpen={true}>
            <Zoom>
              <button className="close-modal" onClick={this.closeModal}>
                x
              </button>

              <div className="product-details">
                <img src={this.props.phone.imgUrl} alt={""}></img>
                <div className="product-details-description">
                  <p>
                    <strong>{this.props.phone._id}</strong>
                  </p>

                  <p>{this.props.phone.name}</p>
                </div>
              </div>
            </Zoom>
            <div>modal</div>
          </Modal>
        )}
      </div>
    );
  }
}

export default Phone;
