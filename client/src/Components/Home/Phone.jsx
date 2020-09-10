import React, { Component } from "react";
// import axios from "axios";
import Fade from "react-reveal/Fade";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
import httpreq from "httpreq";
import { withAuth0 } from "@auth0/auth0-react";
import apiconfig from "../../api_config.json";
import { toast } from "react-toastify";

class Phone extends Component {
  state = {
    insertOrUpdate: 0,
    phoneName: "",
    phoneBrand: "",
    phonePrice: 0,
    resolution: "1440 x 3040 pixels, 19:9 ratio (~550 ppi density)",
    bluetooth: "5.0, A2DP, LE, aptX",
    battery_c: "Li-Ion 3400 mAh, non-removable",
    os: "Android 9.0 (Pie), upgradable to Android 10, One UI 2.1",
    gps: "Yes, with A-GPS, GLONASS, BDS, GALILEO",
  };

  openModal = (Phone) => {
    this.loadPhoneDetails();
    this.setState({ Phone });
  };

  closeModal = () => {
    this.setState({ Phone: null });
  };

  addToCart() {
    const { isAuthenticated } = this.props.auth0;
    if (!isAuthenticated) {
      toast.info("Please login to add items to cart");
    } else {
      this.props.onaddToCart();
    }
  }

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
                width: "125px",
              }}
            />

            <div className="card-body">
              <h6 className="card-title">{this.props.phone.name}</h6>
              <h6 className="card-text">
                {localStorage.getItem("Currency")}
                {""}{" "}
                {(
                  this.props.phone.price *
                  parseFloat(localStorage.getItem("CurrencyRate"))
                ).toFixed(2)}
              </h6>
              <button
                className="btn btn-outline-success float-left"
                onClick={() => this.openModal(this.props.phone._id)}
              >
                View Details
              </button>
              <button
                className="btn btn-primary float-right"
                onClick={() => {
                  this.addToCart();
                }}
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
                    <h4>{this.props.phone.name}</h4>
                  </p>
                  <div className="discription pb-3">
                    <strong>
                      <h4>Specifications</h4>
                    </strong>
                  </div>

                  <div className="container">
                    <h6>Resolution</h6>
                    <ul>
                      <li>{this.state.resolution}</li>
                    </ul>

                    <h6>OS</h6>
                    <ul>
                      <li>{this.state.os}</li>
                    </ul>

                    <h6>Battery Capacity</h6>
                    <ul>
                      <li>{this.state.battery_c}</li>
                    </ul>

                    <h6>Bluetooth</h6>
                    <ul>
                      <li>{this.state.bluetooth}</li>
                    </ul>

                    <h6>GPS</h6>
                    <ul>
                      <li>{this.state.gps}</li>
                    </ul>
                  </div>
                  <div className="product-price">
                    <div>
                      <strong>
                        Price {localStorage.getItem("Currency")}{" "}
                        {(
                          this.props.phone.price *
                          parseFloat(localStorage.getItem("CurrencyRate"))
                        ).toFixed(2)}
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

  async loadPhoneDetails() {
    try {
      let brand2 = this.props.phone.brand;
      var url = "https://fonoapi.freshpixl.com/v1/getdevice";
      let options = {
        parameters: {
          device: this.props.phone.name,
          token: apiconfig.fonoToken,
        },
        timeout: 2900,
      };
      if (brand2) {
        options.parameters.brand = brand2;
      }

      httpreq.post(
        url,
        options,
        function (err, res) {
          if (err) {
            console.log(err);
          } else {
            var data = res.body;
            localStorage.setItem("specs", data);
            var phone = localStorage.getItem("specs");
            var phoneData = JSON.parse(phone);
            this.setState({ resolution: phoneData[0].resolution });
            this.setState({ bluetooth: phoneData[0].bluetooth });
            this.setState({ battery_c: phoneData[0].battery_c });
            this.setState({ os: phoneData[0].os });
            this.setState({ gps: phoneData[0].gps });
          }
        }.bind(this)
      );
    } catch (error) {
      console.error(error);
    }
  }

  async componentDidMount() {
    let CurrentRate = localStorage.getItem("CurrencyRate");
    this.setState({ phonePrice: CurrentRate * this.props.phone.price });
  }
}
export default withAuth0(Phone);
