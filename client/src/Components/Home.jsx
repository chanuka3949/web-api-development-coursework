import React, { Component } from "react";
import StoreItem from "./StoreItem";
import axios from "axios";
import CartSearch from "./CartSearch";
import NavBar from "./NavBar";
import Slider from "./Slider";
import { withAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";

class Home extends Component {
  state = {
    phoneList: [],
    cartItems: [],
    cartCount: 0,
    insertOrUpdate: 0,
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
      </React.Fragment>
    );
  }

  async saveItemsOnCart(phone) { 
    // const {user} = this.props.auth0;
    // localStorage.setItem("A", user.sub.split("|", 2)[1]);
  // localStorage.setItem("A", "7");
  let update = false;  
  let a = localStorage.getItem("cart");
  let cartItems;
 if(a === null){
 localStorage.setItem("cart", JSON.stringify(this.state.cartItems));
 console.log("insideeeeeeeeee");
}else{
  console.log("ihi"); 
}
    let alreadyInCart = false;
    let count = 0;
    cartItems = JSON.parse(localStorage.getItem("cart"));
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
    this.setState({ cartItems });

    this.state.cartItems.push({
      productId: "productId" + 1,
      image: "<imageLink>",
    });

    console.log(this.state.cartItems);
    localStorage.setItem("cart", JSON.stringify(cartItems));

    if (update === false) {
      try {
        await axios
          .post(`http://localhost:5000/api/cart/`, {
            userId: localStorage.getItem("A"),
            itemId: phone._id,
            itemName: phone.name,
            itembrand: phone.brand,
            itemprice: phone.price,
            itemimgUrl: phone.imgUrl,
            itemCount: 1,
          })
          .then(
            (response) => {
              console.log(response.status);
              if (response.status === 200) {
                toast.info("Added to cart");
              }
            },
            (error) => {
              toast.error(error);
            }
          );
      } catch (e) {
        toast.error(e);
      }
    }

    if (update === true) {
      try {
        await axios
          .put(`http://localhost:5000/api/cart/${phone._id}`, {
            itemCount: count,
            userId: localStorage.getItem("A"),
            itemId: phone._id,
          })
          .then(
            (response) => {
              console.log(response.status);
              toast.info("Added to cart");
            },
            (error) => {
              toast.error(error);
            }
          );
      } catch (e) {
        toast.error(e);
      }
    }
  }

  async componentDidMount() {
    try { 
    //  localStorage.removeItem("cart");
    //  localStorage.removeItem("A");
      // //geting the IP
      // const api = await axios.get(`https://api.ipify.org`);
      // console.log(api.data);
      // localStorage.setItem("IP", api.data);

      // //getting location details and saved the currency type
      // let Currency;
      // const ipfindKey = "4bb7829c-0573-4555-963f-488c0c938aba";
      // const IP = localStorage.getItem("IP");
      // const LocationDetails = await axios.get(
      //   `https://api.ipfind.com/?ip=${IP}&auth=${ipfindKey}`
      // );

      // if (LocationDetails !== null) {
      //   Currency = LocationDetails.data.currency;
      //   localStorage.setItem("Currency", LocationDetails.data.currency);
      //   console.log(LocationDetails.data.currency);
      //   console.log(LocationDetails);
      // }

      // //getting currency details
      // const fixerApiAccessKey = "d06e1099c3d4e07d044c77a892774bd8";
      // let CurrencyData = await axios.get(
      //   `https://data.fixer.io/api/latest?access_key=${fixerApiAccessKey}`
      // );
      // CurrencyData = CurrencyData.data.rates;

      // //searching with already saved currency type and save the currency rate
      // if (CurrencyData !== null) {
      //   for (var i in CurrencyData) {
      //     if (i === Currency) {
      //       console.log(CurrencyData[i]);
      //       localStorage.setItem("CurrencyRate", CurrencyData[i]);
      //     }
      //   }
      // }

      let { data } = await axios.get("http://localhost:5000/api/phones/");
      this.setState({ phoneList: data });

      let newCount = 0;
      let cart = JSON.parse(localStorage.getItem("cart"));
      if (cart !== null) {
        for (let i = 0; i < cart.length; i++) {
          if (cart[i]) {
            console.log(cart[i].count);
            newCount = newCount + cart[i].count;
          }
        }
        console.log(newCount);
        this.setState({ cartCount: newCount });
      }
    } catch (error) {
      console.error(error);
    }
  }
}

export default withAuth0(Home);
