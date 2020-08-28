import React, { Component } from "react";
import axios from "axios";
import CartSearch from "./CartSearch";
import Cart from "./Cart";
import NavBar from "./NavBar";
import Checkout from "./Checkout";
import Loading from "./Loading";
import { withAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

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

        <div className="row no-gutters">
          {this.state.cartList.map((item) => (
            <Cart
              key={item._id}
              phone={item}
              onCount={() => this.updateCartItem(item)}
              onCountDeduct={() => this.deductCartItem(item)}
            />
          ))}
        </div>

        <div>
          <Checkout />
        </div>
      </React.Fragment>
    );
  }

  // increase the qty
  async updateCartItem(item) {
    await axios.put(`http://localhost:5500/api/cart/${item._id}`, {
      itemCount: item.itemCount + 1,
      //  itemprice: item.itemprice + item.itemprice,
    });

    // let total = item.itemprice + item.itemprice;
    //console.log(total);

    let cartList = [...this.state.cartList];
    let index = cartList.indexOf(item);
    cartList[index] = { ...item };
    cartList[index].itemCount++;
    //  cartList[index].itemprice++ ;
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
    console.log(data);
    this.setState({ cartList: data });
  }
}

// export default CartHome; //Use this to bypass the login redirect when development
export default withAuth0(
  withAuthenticationRequired(CartHome, {
    onRedirecting: () => <Loading />,
  })
);
