import React, { Component } from "react";
import axios from "axios";
import Cart from "./Cart";
import NavBar from "../NavBar";
import Checkout from "./Checkout";
import Loading from "../Loading";
import { withAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import ShippingDetails from "./ShippingDetails";
import { toast } from "react-toastify";
import routesconfig from "../../routes_config.json";

class CartHome extends Component {
  state = {
    cartList: [],
    cartTotal: 0,
    cartQuantity: 0,
    currency: localStorage.getItem("Currency"),
    currencyRate: localStorage.getItem("CurrencyRate"),
  };
  calculateTotalAmount() {
    this.setState({
      cartTotal: 0,
      cartQuantity: 0,
    });
    this.state.cartList.forEach((item) => {
      this.setState({
        cartTotal:
          this.state.cartTotal +
          item.itemPrice * item.itemCount * parseFloat(this.state.currencyRate),
        cartQuantity: this.state.cartQuantity + item.itemCount,
      });
    });
  }

  render() {
    return (
      <React.Fragment>
        <div>
          <NavBar cartCount={this.state.cartQuantity} />
        </div>

        <div className="container">
          <div className="row no-gutters">
            <div className="col-sm-8" style={{ marginTop: 100 }}>
              {this.state.cartList.map((item) => (
                <Cart
                  key={item._id}
                  phone={item}
                  currency={this.state.currency}
                  currencyRate={parseFloat(this.state.currencyRate)}
                  onCount={() => this.updateCartItem(item)}
                  onCountDeduct={() => this.deductCartItem(item)}
                  onDelete={() => this.deleteCartItem(item.itemId)}
                />
              ))}
            </div>
            <div className="col-sm-4">
              <ShippingDetails />
              <Checkout
                checkout={() => {
                  this.chechkOut();
                }}
                clear={() => {
                  this.deleteFromCart();
                }}
                quantity={this.state.cartQuantity}
                total={this.state.cartTotal.toFixed(2)}
                currency={this.state.currency}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  async chechkOut() {
    try {
      axios
        .post(`${routesconfig.checkOut}/`, {
          userId: localStorage.getItem("userID"),
          cartList: this.state.cartList,
          total: this.state.cartTotal / parseFloat(this.state.currencyRate),
        })
        .then(
          (response) => {
            toast.success("Order Successfull");
            this.deleteFromCart();
            localStorage.setItem("chckoutSuccessMsg", "chckoutSuccessMsg");
            localStorage.removeItem("cart");
          },
          (error) => {
            toast.warning(error.response.data.message);
          }
        );
    } catch (e) {
      toast.error(e);
    }
  }

  async deleteFromCart() {
    try {
      await axios
        .delete(
          `${routesconfig.cart}/deletecart/${localStorage.getItem("userID")}`,
          {
            userId: localStorage.getItem("userID"),
          }
        )
        .then(
          (response) => {
            let msg = localStorage.getItem("chckoutSuccessMsg");
            if (!msg) {
              toast.success("Removed Items From Cart");
            }
            localStorage.removeItem("chckoutSuccessMsg");
            this.setState({ cartList: [] });
            this.calculateTotalAmount();
            localStorage.removeItem("cart");
          },
          (error) => {
            toast.warning(error.response.data.message);
          }
        );
    } catch (e) {
      toast.error(e);
    }
  }

  // increase the qty
  async updateCartItem(item) {
    await axios
      .put(`http://localhost:5000/api/cart/${item.itemId}`, {
        itemCount: item.itemCount + 1,
        userId: localStorage.getItem("userID"),
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
    this.setState({ cartList: cartList });
    this.calculateTotalAmount();

    let a = JSON.parse(localStorage.getItem("cart"));
    for (let i = 0; i < a.length; i++) {
      console.log(item.itemId);
      if ((a[i]._id === item.itemId) | (a[i].itemId === item.itemId)) {
        console.log(a[i].count);
        a[i].itemcount = a[i].count++;
        localStorage.setItem("cart", JSON.stringify(a));
      }
    }
  }

  // deduct the qty
  async deductCartItem(item) {
    try {
      await axios.put(`http://localhost:5000/api/cart/${item.itemId}`, {
        itemCount: item.itemCount - 1,
        userId: localStorage.getItem("userID"),
        itemId: item._id,
      });

      let cartList = [...this.state.cartList];
      let index = cartList.indexOf(item);
      cartList[index] = { ...item };
      cartList[index].itemCount--;
      this.setState({ cartList: cartList });
      this.calculateTotalAmount();

      let a = JSON.parse(localStorage.getItem("cart"));
      for (let i = 0; i < a.length; i++) {
        console.log(item.itemId);
        if ((a[i]._id === item.itemId) | (a[i].itemId === item.itemId)) {
          console.log(a[i].count);
          a[i].itemcount = a[i].count--;
          localStorage.setItem("cart", JSON.stringify(a));
        }
      }
    } catch (e) {
      if (e.response && e.response.data) {
        alert(e.response.data.message + e.response.status);
      }
    }
  }

  async deleteCartItem(itemtodeleteid) {
    let newCart = this.state.cartList.filter(
      (item) => item.itemId !== itemtodeleteid
    );
    try {
      await axios
        .delete(`http://localhost:5000/api/cart/${itemtodeleteid}`, {
          userId: localStorage.getItem("userID"),
        })
        .then(
          (response) => {
            toast.success("Removed");
          },
          (error) => {
           toast.error(error.response.data.message);
          }
        );
    } catch (e) {
      toast.error(e);
    }
    this.setState({ cartList: newCart });
    this.calculateTotalAmount();

    let a = JSON.parse(localStorage.getItem("cart"));
    for (let i = 0; i < a.length; i++) {
      console.log(a[i]._id);
      if ((a[i]._id === itemtodeleteid) | (a[i].itemId === itemtodeleteid)) {
        console.log(a[i]);
        a.splice(i, 1);
        i--;
        localStorage.setItem("cart", JSON.stringify(a));
      }
    }
  }

  async componentDidMount() {
    try {
      let { data } = await axios.get(
        `http://localhost:5000/api/cart/${localStorage.getItem("userID")}`
      );
      console.log(data);
      this.setState({ cartList: data });
      this.calculateTotalAmount();
    } catch (e) {
      console.log(e.message);
    }
  }
}

export default withAuth0(
  withAuthenticationRequired(CartHome, {
    onRedirecting: () => <Loading />,
  })
);
