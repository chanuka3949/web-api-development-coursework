import React, { Component } from "react";

class Cart extends Component {
  state = {};

  render() {
    return (
      <div id="root">
        <main className="container">
          <div>
            <div className="row no-gutters justify-content-center">
              <div className="col-sm-9 p-3">
                <div>
                  <div className="card card-body border-0">
                    <div className="row no-gutters py-2">
                      <div className="col-sm-2 p-2">
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
                        <h5 className="mb-1">{this.props.phone.itemName}</h5>
                        <p className="mb-1">
                          Price: {this.props.phone.itemprice}
                        </p>
                      </div>
                      <div className="col-sm-2 p-2 text-center ">
                        <p className="mb-0">
                          Qty: {this.props.phone.itemCount}
                        </p>
                      </div>
                      <div className="col-sm-4 p-2 text-right">
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
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default Cart;
