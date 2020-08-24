import React, { Component } from "react";

class Checkout extends Component {
  state = {};

  render() {
    return (
      
        <div className="col-sm-3 p-3">
            
        <div className="card card-body">
          <h6 className="mb-1">Total Items</h6>
          <h4 className=" mb-3 txt-right">1</h4>
          <h6 className="mb-1">Total Payment</h6>
          <h3 className="m-0 txt-right">$134.99</h3>
          <hr className="my-4" />
          <div className="text-center">
            <button type="button" className="btn btn-primary mb-2">
              CHECKOUT
            </button>
            <button
              type="button"
              className="btn btn-outlineprimary btn-sm"
            >
              CLEAR
            </button>
          </div>
        </div>
      </div>
    );
  }
  
}

export default Checkout;
