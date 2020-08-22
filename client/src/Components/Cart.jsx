import React, { Component } from "react";

class Cart extends Component {
  state = {};
  
  render() {
    return (
      <div id="root">
        <main className="container">
          <div>
            <div className="text-center mt-5">
              <h1>Cart</h1>
              <p>This is the Cart Page.</p>
            </div>
            <div className="row no-gutters justify-content-center">
              <div className="col-sm-9 p-3">
                <div>
                  <div className="card card-body border-0">
                    <div className="row no-gutters py-2">
                      <div className="col-sm-2 p-2">
                        <img
                          alt="Sour Puss Raspberry"
                          src="https://objectstorage.ap-mumbai-1.oraclecloud.com/n/softlogicbicloud/b/cdn/o/products/140-140/M21BL--1--1592480087.jpg"
                          className="img-fluid d-block"
                          style={{ margin: "0px auto", maxHeight: "50px" }}
                        />
                      </div>
                      <div className="col-sm-4 p-2">
                        <h5 className="mb-1">Samsung Galaxy M11 (32GB) - Violet</h5>
                        <p className="mb-1">Price: $134.99 </p>
                      </div>
                      <div className="col-sm-2 p-2 text-center ">
                        <p className="mb-0">Qty: 1</p>
                      </div>
                      <div className="col-sm-4 p-2 text-right">
                        <button className="btn btn-primary btn-sm mr-2 mb-1">
                          <svg
                            width="20px"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="" clipRule="evenodd" fillRule="evenodd" />
                          </svg>
                        </button>
                        <button className="btn btn-danger btn-sm mb-1">
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
              <div className="col-sm-3 p-3">
                <div className="card card-body">
                  <p className="mb-1">Total Items</p>
                  <h4 className=" mb-3 txt-right">1</h4>
                  <p className="mb-1">Total Payment</p>
                  <h3 className="m-0 txt-right">$134.99</h3>
                  <hr className="my-4" />
                  <div className="text-center">
                    <button type="button" className="btn btn-primary mb-2">
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
        </main>
        <footer className="footer_footer__15JWM  mt-5 p-3">
          2020 © React Store
        </footer>
      </div>
    );
  }
}

export default Cart;
