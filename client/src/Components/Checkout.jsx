import React, { Component } from "react";
// import Fade from "react-reveal/Fade";
import { Redirect } from "react-router-dom";

class Checkout extends Component {
  state = {
    data: this.props.data,
  };

  render() {
    return (
      // <Fade left cascade>
      //   <main className="container">
      //     <div>
      //       <div className="col-sm-4 checkout">
      //         </div>
      //     </div>
      //   </main>
      // </Fade>
      <div>
        <div className="card card-body mt-4">
          <div className="row no-gutters py-2">
            <div className="card card-body">
              <div>{this.state.data}</div>
              <h6 className="mb-1">Total Items</h6>
              <h4 className=" mb-3 txt-right">{this.props.quantity}</h4>
              <h6 className="mb-1">Total Payment</h6>
              <h3 className="m-0 txt-right">
                {this.props.currency} {this.props.total}
              </h3>
              <hr className="my-4" />
              <div className="text-center">
                <button
                  type="button"
                  className="btn btn-primary mb-2"
                  onClick={this.props.checkout}
                >
                  CHECKOUT
                </button>
                <button type="button" className="btn btn-outlineprimary btn-sm">
                  CLEAR
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Checkout;
