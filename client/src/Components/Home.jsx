import React, { Component } from "react";
import StoreItem from "./StoreItem";
import axios from "axios";
import CartSearch from "./CartSearch";
import NavBar from "./NavBar";
import Slider from "./Slider";
var getIP = require("../thirdPartyAPI/IP.js");

class Home extends Component {
  state = {
    phoneList: [],
    cartItems: [],
    cartCount: 0,
    insertOrUpdate : 0,
  };

  render() {
    return (
      <React.Fragment>
        <div>
          <NavBar cartCount={this.state.cartCount} />
        </div>

        <div className="">
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
    
    localStorage.setItem("A", "7");
    let update = false;
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart = false;
    let count = 0;
    cartItems.forEach((item) => {
      if (item._id === phone._id) {
        item.count++;
        count = item.count;
        alreadyInCart = true;
        update = true;
        this.setState({ cartCount: this.state.cartCount + 1 });
      }
    });
    if (!alreadyInCart) {
      cartItems.push({ ...phone, count: 1 });
      update = false;
      this.setState({ cartCount: this.state.cartCount + 1 });
    }
    this.setState({ cartItems});
    
    if(update === false){
      await axios.post(`http://localhost:5500/api/cart/`, {
        userId: localStorage.getItem("A"),
        itemId: phone._id,
        itemName: phone.name,
        itembrand: phone.brand,
        itemprice: phone.price,
        itemimgUrl: phone.imgUrl,
        itemCount: 1,
      });
    }

    if(update === true){
      await axios.put(`http://localhost:5500/api/cart/${phone._id}`, {
        itemCount: count,
        userId: localStorage.getItem("A"),
        itemId: phone._id
      });
    }

   
  }


  async componentDidMount() {
    //getIP.getIP();

    let api = await axios.get(`https://api.ipify.org`);
    console.log(api.data);
    localStorage.setItem("IP", api.data);

    let ipfindKey = "96991d78-d978-42f1-ab20-e04f1b88e790";
    let IP = "81.142.16.134";
    let LocationDetails = await axios.get(
      `https://api.ipfind.com/?ip=${IP}&auth=${ipfindKey}`
    );
    localStorage.setItem("Currency", LocationDetails.data.currency);
    let Currency = LocationDetails.data.currency;
    console.log(LocationDetails.data.currency);
    console.log(LocationDetails);

    let fixerApiAccessKey = "ebd93aa637b090f8808a8c83b5a9478c";
    let CurrencyData = await axios.get(
      `http://data.fixer.io/api/latest?access_key=${fixerApiAccessKey}`
    );
    CurrencyData = CurrencyData.data.rates;

    for (var i in CurrencyData) {
      if (i === Currency) {
        console.log(CurrencyData[i]);
        localStorage.setItem("CurrencyRate", CurrencyData[i]);
      }
    }

    let { data } = await axios.get("http://localhost:5500/api/phones/");
    this.setState({ phoneList: data });
  }
}

export default Home;
