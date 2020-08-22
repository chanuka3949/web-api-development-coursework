import React, { Component } from "react";

class CartPage extends Component {
  state = {};
  
  render() {
    return (
      <main class="container">
        
        <div class="ProductsGrid_p__grid__y0eGP">
          <div className="card card-body">
            <img
              className="img-fluid"
              src="https://objectstorage.ap-mumbai-1.oraclecloud.com/n/softlogicbicloud/b/cdn/o/products/140-140/M21BL--1--1592480087.jpg"
              alt=""
              style={{
                display: "block",
                margin: "0px auto 10px",
                maxHeight: "200px",
              }}
            />
            <h6>Samsung Galaxy M11 (32GB) - Violet</h6>
            <h3 className="text-left">$39.11</h3>
            <div className="text-right">
              <a className="btn btn-link btn-sm mr-2" href="">
                Details
              </a>
              <button className="btn btn-primary btn-sm">Add to cart</button>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default CartPage;
