import React, { Component } from "react";
//import Fade from "react-reveal/Fade";

class Cart extends Component {
  state = {};

  render() {
    return (
            
              <div className="card mb-4">
                <div className="card-body">
                  <div className="row no-gutters py-2">
                    <div className="col-sm-1 cart-close">
                      <button className="btn btn-danger"> X </button>
                    </div>
                    <div className="col-sm-2">
                      <img
                        className="img-fluid"
                        src={this.props.phone.itemimgUrl}
                        alt=""
                        style={{
                          display: "block",
                          margin: "0px auto 10px",
                          maxHeight: "200px", 
                        }}
                      />
                    </div>

                    <div className="col-sm-4 p-2">
                      <h6 className="mb-1">{this.props.phone.itemName}</h6>
                      <strong>
                        <p className="mb-1">
                          Price: {this.props.phone.itemprice}
                        </p>
                      </strong>
                    </div>
                    <div className="col-sm-2 p-2 text-center ">
                      <strong>
                        <p className="mb-0">
                          Qty: {this.props.phone.itemCount}
                        </p>
                      </strong>
                    </div>
                    <div className="col-sm-2 p-2 text-right">
                      <button
                        className="btn btn-primary btn-sm mr-2 mb-1"
                        onClick={this.props.onCountDeduct}
                        style={{ height: "35px" }}
                      >
                        <img src="minus-solid.svg" alt="" />
                        <svg
                          width="20px"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="" clipRule="evenodd" fillRule="evenodd" />
                        </svg>
                      </button>
                      <button
                        className="btn btn-danger btn-sm mb-1"
                        onClick={this.props.onCount}
                        style={{ height: "35px" }}
                      >
                        <img src="plus-circle-solid.svg" alt="" />
                        <svg
                          width="20px"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="" clipRule="evenodd" fillRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
    );
  }
}

export default Cart;
