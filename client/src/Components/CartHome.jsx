import React, { Component } from "react";
import axios from "axios";
// import CartSearch from "./CartSearch";
import Cart from "./Cart";
import NavBar from "./NavBar";
import Checkout from "./Checkout";
import Loading from "./Loading";
import { withAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import ShippingDetails from "./ShippingDetails";

import Fade from "react-reveal/Fade";

class CartHome extends Component {
  state = {
    cartList: [],
    cartTotal: 0,
    cartQuantity: 0,
    currency: localStorage.getItem("Currency")
  };
  calculateTotalAmount() {
    this.setState({
      cartTotal: 0,
      cartQuantity: 0,
    });
    this.state.cartList.forEach((item) => {
      this.setState({
        cartTotal: this.state.cartTotal + item.itemprice * item.itemCount,
        cartQuantity: this.state.cartQuantity + item.itemCount,
      });
    });
  }

  render() {
    return (
      <React.Fragment>
        <div>
          <NavBar cartCount={this.state.cartCount} />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-sm-8" style={{ marginTop: 100 }}>
              <div className="row no-gutters">
                {this.state.cartList.map((item) => (
                  <Cart
                    key={item._id}
                    phone={item}
                    currency={this.state.currency}
                    onCount={() => this.updateCartItem(item)}
                    onCountDeduct={() => this.deductCartItem(item)}
                    onDelete={() => this.deleteCartItem(item.itemId)}
                  />
                ))}
              </div>
            </div>
            <div className="col-sm-4">
              <ShippingDetails />
              <Checkout
                checkout={() => {this.chechkOut()}}
                quantity={this.state.cartQuantity}
                total={this.state.cartTotal}
                currency={this.state.currency}
              />
            </div>
          </div>
        </div>
        {/* <div>
          <button onClick={() => this.chechkOut()}>ChechkOut</button>
        </div> */}
      </React.Fragment>
    );
  }

  async chechkOut() {
    console.log(this.state.cartList);
    await axios.post(`http://localhost:5000/api/checkOut/`, {
      userId: localStorage.getItem("A"),
      cartList: this.state.cartList,
    });
    this.deletefromCart();
  }

  async deletefromCart() {
    await axios.delete(
      `http://localhost:5000/api/cart/deletecart/${localStorage.getItem("A")}`,
      {
        userId: localStorage.getItem("A"),
      }
    );
    this.setState({ cartList: [] });
    this.calculateTotalAmount();
  }

  // increase the qty
  async updateCartItem(item) {
    await axios
      .put(`http://localhost:5000/api/cart/${item.itemId}`, {
        itemCount: item.itemCount + 1,
        userId: localStorage.getItem("A"),
        itemId: item._id,
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });

    let cartList = [...this.state.cartList];
    let index = cartList.indexOf(item);
    cartList[index] = { ...item };
    cartList[index].itemCount++;
    // cartList[index].itemprice++ ;
    this.setState({ cartList: cartList });
    this.calculateTotalAmount();
  }

  // deduct the qty
  async deductCartItem(item) {
    await axios.put(`http://localhost:5000/api/cart/${item.itemId}`, {
      itemCount: item.itemCount - 1,
      userId: localStorage.getItem("A"),
      itemId: item._id,
    });

    let cartList = [...this.state.cartList];
    let index = cartList.indexOf(item);
    cartList[index] = { ...item };
    cartList[index].itemCount--;
    this.setState({ cartList: cartList });
    this.calculateTotalAmount();
  }

  async deleteCartItem(itemtodeleteid) {
    let newCart = this.state.cartList.filter(
      (item) => item.itemId !== itemtodeleteid
    );
    await axios.delete(`http://localhost:5000/api/cart/${itemtodeleteid}`, {
      userId: localStorage.getItem("A"),
    });
    this.setState({ cartList: newCart });
    this.calculateTotalAmount();
  }

  async componentDidMount() {
    try {
      let { data } = await axios.get(`http://localhost:5000/api/cart/${7}`);
      console.log(data);
      this.setState({ cartList: data });
      this.calculateTotalAmount();
    } catch (e) {
      console.log(e.message);
    }
  }
}

// export default CartHome; //Use this to bypass the login redirect when development
export default withAuth0(
  withAuthenticationRequired(CartHome, {
    onRedirecting: () => <Loading />,
  })
);
