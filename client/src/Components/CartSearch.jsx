import React, { Component } from "react";

class Cartsearch extends Component {
  state = {};

  render() {
    return (
      <div className="container">
        <div className="text-center mt-5">
          <h1>Welcome to our Store</h1>
          <p>This is the Store Page.</p>
        </div>

        <div className="row">
          <div className="col-sm-8">
            <div className="py-3"></div>
          </div>
          <div className="col-sm-4">
            <div className="form-group">
              <input
                type="text"
                name
                placeholder="Search product"
                className="form-control"
                id
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Cartsearch;
