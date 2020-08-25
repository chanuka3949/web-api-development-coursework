import React, { Component } from "react";
import axios from "axios";
import CartSearch from "./CartSearch";
import Cart from "./Cart";
import NavBar from "./NavBar";
import Checkout from "./Checkout";

class CartHome extends Component {
  state = {
    cartList: [],
  };

  render() {
    return (
      <React.Fragment>
        <div>
          <NavBar cartCount={this.state.cartCount} />
        </div>
        <div>
          <CartSearch />
        </div>

        {this.state.cartList.map((item) => (
          <Cart
            key={item._id}
            phone={item}
            onCount={() => this.updateCartItem(item)}
            onCountDeduct={() => this.deductCartItem(item)}
          />
        ))}
        <Checkout/>
      </React.Fragment>
    );
  }

  // increase the qty
  async updateCartItem(item) {
    await axios.put(`http://localhost:5500/api/cart/${item._id}`, {
      itemCount: item.itemCount + 1,
      // itemprice: item.itemprice + item.itemprice,
    });

    let cartList = [...this.state.cartList];
    let index = cartList.indexOf(item);
    cartList[index] = { ...item };
    cartList[index].itemCount++;
    // cartList[index].itemprice++ ;
    this.setState({ cartList: cartList });
  }

  // deduct the qty
  async deductCartItem(item) {
    await axios.put(`http://localhost:5500/api/cart/${item._id}`, {
      itemCount: item.itemCount - 1,
    });

    let cartList = [...this.state.cartList];
    let index = cartList.indexOf(item);
    cartList[index] = { ...item };
    cartList[index].itemCount--;
    this.setState({ cartList: cartList });
  }

  async componentDidMount() {
    let { data } = await axios.get(`http://localhost:5500/api/cart/${2}`);
    this.setState({ cartList: data });

  }
}

export default CartHome;
