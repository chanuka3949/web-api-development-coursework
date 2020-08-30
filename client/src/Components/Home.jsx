import React, { Component } from "react";
import StoreItem from "./StoreItem";
import axios from "axios";
import CartSearch from "./CartSearch";
import NavBar from "./NavBar";
import Slider from "./Slider";

class Home extends Component {
  state = {
    phoneList: [],
    cartItems: [],
    cartCount: 0,
  };

  render() {
    return (
      <React.Fragment>
        <div>
          <NavBar cartCount={this.state.cartCount} />
        </div>

        <div className="container">
          <Slider />
        </div>

        <div>
          <CartSearch />
        </div>

        <div
          className="card-deck"
          style={{
            // marginLeft: 40,
            marginLeft: 150,
            marginRight: 150,
            marginTop: 10,
            marginBottom: 100,
          }}
        >
          {this.state.phoneList.map((phone) => (
            <StoreItem
              key={phone._id}
              phone={phone}
              onaddToCart={() => this.saveItemsOnCart(phone)}
            />
          ))}
        </div>
        <div></div>
      </React.Fragment>
    );
  }

  addToCart = (phone) => {
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart = false;
    cartItems.forEach((item) => {
      if (item.id === phone.id) {
        item.count++;
        alreadyInCart = true;
        this.setState({ cartCount: this.state.cartCount + 1 });
      }
    });
    if (!alreadyInCart) {
      cartItems.push({ ...phone, count: 1 });
      this.setState({ cartCount: this.state.cartCount + 1 });
    }
    this.setState({ cartItems: cartItems });

    this.saveItemsOnCart(this.state.cartItems);
  };

  async saveItemsOnCart(phone) {
    await axios
      .post(`http://localhost:5500/api/cart/`, {
        userId: localStorage.getItem("A"),
        itemId: phone._id,
        itemName: phone.name,
        itembrand: phone.brand,
        itemprice: phone.price,
        itemimgUrl: phone.imgUrl,
        itemCount: 1,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    localStorage.setItem("A", "2");

    const cartItems = this.state.cartItems.slice();
    let alreadyInCart = false;
    cartItems.forEach((item) => {
      if (item.id === phone.id) {
        item.count++;
        alreadyInCart = true;
        this.setState({ cartCount: this.state.cartCount + 1 });
      }
    });
    if (!alreadyInCart) {
      cartItems.push({ ...phone, count: 1 });
      this.setState({ cartCount: this.state.cartCount + 1 });
    }
    this.setState({ cartItems: cartItems });
  }

  async componentDidMount() {
    let { data } = await axios.get("http://localhost:5500/api/phones/");

    this.setState({ phoneList: data });
  }
}

export default Home;
