import React, { Component } from "react";
import Fade from "react-reveal/Fade";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";

class Phone extends Component {
  state = {};

  openModal = (Phone) => {
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
                // width: "135px",
                width: "125px",
              }}
            />

            <div className="card-body">
              <h6 className="card-title">{this.props.phone.name}</h6>
              <h6 className="card-text">
                ${""} {this.props.phone.price}
              </h6>
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
                    <strong>{this.props.phone.name}</strong>
                  </p>
                  <div className="discription pb-3">
                    <strong>
                      <h4>Discription</h4>
                    </strong>
                  </div>

                  <div className="container">
                    <h6>Display</h6>
                    <ul>
                      <li>VDIS (Video Digital Image Stabilization)</li>
                      <li>VDIS (Video Digital Image Stabilization)</li>
                      <li>VDIS (Video Digital Image Stabilization)</li>
                    </ul>

                    <h6>Front Camera</h6>
                    <ul>
                      <li>VDIS (Video Digital Image Stabilization)</li>
                      <li>VDIS (Video Digital Image Stabilization)</li>
                      <li>VDIS (Video Digital Image Stabilization)</li>
                    </ul>

                    <h6>Battery Capacity</h6>
                    <ul>
                      <li>VDIS (Video Digital Image Stabilization)</li>
                      <li>VDIS (Video Digital Image Stabilization)</li>
                      <li>VDIS (Video Digital Image Stabilization)</li>
                    </ul>

                    <h6>Memory</h6>
                    <ul>
                      <li>VDIS (Video Digital Image Stabilization)</li>
                      <li>VDIS (Video Digital Image Stabilization)</li>
                      <li>VDIS (Video Digital Image Stabilization)</li>
                    </ul>
                  </div>

                  <div className="product-price">
                    <div>
                      <strong>
                        Price ${""}
                        {this.props.phone.price}
                      </strong>
                    </div>
                    <button
                      className="button primary btn btn-primary"
                      onClick={() => {
                        this.props.onaddToCart();
                        this.closeModal();
                      }}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            </Zoom>
          </Modal>
        )}
      </div>
    );
  }
}

export default Phone;
