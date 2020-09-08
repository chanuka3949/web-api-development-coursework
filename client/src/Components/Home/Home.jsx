import React, { Component } from "react";
import StoreItem from "./Phone";
import axios from "axios";
import CartSearch from "../Cart/CartSearch";
import NavBar from "../NavBar";
import Slider from "../Slider";
import { withAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";
import apiconfig from "../../api_config.json";

class Home extends Component {
  state = {
    phoneList: [],
    cartItems: [],
    cartCount: 0,
    insertOrUpdate: 0,
    searchTerm: "",
  };

  handleChange = (event) => {
    this.setState({ searchTerm: event.target.value });
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

        {/* <div>
          <CartSearch />
        </div> */}

        <div className="container">
          <div className="text-center mt-5">
            <h1>Welcome to our Store</h1>
            <p>This is the Store Page.</p>
          </div>

          <div className="row">
            <div className="col-sm-12">
              <div className="d-flex justify-content-center pb-3 search-button">
                <input
                  type="text"
                  name="search"
                  placeholder="Search product"
                  className="form-control"
                  value={this.state.value}
                  onChange={this.handleChange}
                />
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    this.getPhoneByName(this.state.searchTerm);
                  }}
                >
                  <img src="search.png" alt=""></img>
                </button>{" "}
              </div>
            </div>
          </div>
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
    let update = false;
    let a = localStorage.getItem("cart");
    let cartItems;
    if (a === null) {
      localStorage.setItem("cart", JSON.stringify(this.state.cartItems));
      console.log("insideeeeeeeeee");
    } else {
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
  getPhoneList() {
    axios.get("http://localhost:5000/api/phones/").then(
      (response) => {
        this.setState({ phoneList: response.data });
      },
      (error) => {
        toast.error(error.message);
      }
    );
  }

  getPhoneByName(name) {
    axios.get(`http://localhost:5000/api/phones/${name}`).then(
      (response) => {
        this.setState({ phoneList: response.data });
      },
      (error) => {
        toast.error(error.message);
      }
    );
  }

  async componentDidMount() {
    try {
      this.getPhoneList();
      //  localStorage.removeItem("cart");
      //  localStorage.removeItem("A");
      //geting the IP
      // const api = await axios.get(`https://api.ipify.org`);
      // console.log(api.data);
      // localStorage.setItem("IP", api.data);

      // //getting location details and saved the currency type
      // let Currency;

      // const IP = localStorage.getItem("IP");
      // const LocationDetails = await axios.get(
      //  `https://api.ipfind.com/?ip=${IP}&auth=${apiconfig.ipfindKey}`
      // );

      // if (LocationDetails !== null) {
      //   Currency = LocationDetails.data.currency;
      //   localStorage.setItem("Currency", LocationDetails.data.currency);
      //   console.log(LocationDetails.data.currency);
      //   console.log(LocationDetails);
      // }

      // //getting currency details

      // let CurrencyData = await axios.get(
      //   `https://data.fixer.io/api/latest?access_key=${apiconfig.fixerAccessKey}`
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
