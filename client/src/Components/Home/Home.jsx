import React, { Component } from "react";
import StoreItem from "./Phone";
import axios from "axios";
import CartSearch from "../Cart/CartSearch";
import NavBar from "../NavBar";
import Slider from "../Slider";
import { withAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";
import apiconfig from "../../api_config.json";
import routesconfig from "../../routes_config.json";

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
    console.log(this.state.searchTerm);
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
    }
    let alreadyInCart = false;
    let count = 0;
    cartItems = JSON.parse(localStorage.getItem("cart"));
    cartItems.forEach((item) => {
      if ((item.itemId === phone._id) | (item._id === phone._id)) {
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
          .post(`${routesconfig.cart}/`, {
            userId: localStorage.getItem("userID"),
            itemId: phone._id,
            itemName: phone.name,
            itemBrand: phone.brand,
            itemPrice: phone.price,
            itemImgUrl: phone.imgUrl,
            itemCount: 1,
          })
          .then(
            (response) => {
              toast.info("Added to cart");
            },
            (error) => {
              toast.warning(error.response.data.message);
              cartItems = JSON.parse(localStorage.getItem("cart"));
              cartItems.forEach((item) => {
                if ((item.itemId === phone._id) | (item._id === phone._id)) {
                  item.count--;
                  count = item.count;
                }
              });
              this.setState({ cartCount: this.state.cartCount - 1 });
              localStorage.setItem("cart", JSON.stringify(cartItems));
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
            userId: localStorage.getItem("userID"),
            itemId: phone._id,
          })
          .then(
            (response) => {
              console.log(response.status);
              toast.info("Added to cart");
            },
            (error) => {
              toast.error(error);
              toast.warning(error.response.data.message);
              cartItems = JSON.parse(localStorage.getItem("cart"));
              cartItems.forEach((item) => {
                if ((item.itemId === phone._id) | (item._id === phone._id)) {
                  item.count--;
                  count = item.count;
                  alreadyInCart = true;
                  update = true;
                  this.setState({ cartCount: this.state.cartCount - 1 });
                }
              });
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
//`http://localhost:5000/api/phones/${name}`
  getPhoneByName(name) {
    axios.get(`${routesconfig.phones}/${name}`).then(
      (response) => {
        this.setState({ phoneList: response.data });
      },
      (error) => {
        toast.error(error.message);
      }
    );
  }

  async loadToCart() {
    try {
    } catch (e) {
      console.log(e.message);
    }
  }

  async componentDidMount() {
    try {
      const { isAuthenticated } = this.props.auth0;

      let login = localStorage.getItem("login");
      let loadApi = localStorage.getItem("loadApi");

      if (loadApi === null) {
        // geting the IP
        const api = await axios.get(`https://api.ipify.org`);
        console.log(api.data);
        localStorage.setItem("IP", api.data);

        //getting location details and saved the currency type
        const IP = localStorage.getItem("IP");
        let LocationDetails = await axios.get(
          `https://api.ipfind.com/?ip=${IP}&auth=${apiconfig.ipfindKey}`
        );

        if (LocationDetails !== null) {
          console.log(LocationDetails);
          localStorage.setItem("Currency", LocationDetails.data.currency);
          console.log(LocationDetails.data.currency);
        }

        localStorage.setItem("loadApi", "true");
      }
      //getting currency details
      const CurrencyData = await axios.get(
        `http://data.fixer.io/api/latest?access_key=${apiconfig.fixerAccessKey}`
      );
      const CurrencyDataRate = CurrencyData.data.rates;

      //searching with already saved currency type and save the currency rate
      if (CurrencyDataRate !== null) {
        for (var i in CurrencyDataRate) {
          if (i === localStorage.getItem("Currency")) {
            console.log(CurrencyDataRate[i]);
            localStorage.setItem("CurrencyRate", CurrencyDataRate[i]);
          }
        }
      }

      if (login === null) {
        if (isAuthenticated) {
          localStorage.setItem("login", "true");

          let cartListArray = [];
          let newCartList = {
            _id: "",
            userId: "",
            itemId: "",
            itemName: "",
            itemBrand: "",
            itemPrice: "",
            itemImgUrl: "",
            itemCount: 0,
          };

          let { data } = await axios.get(
            `http://localhost:5000/api/cart/${localStorage.getItem("userID")}`
          );
          console.log(data);
          for (let i = 0; i < data.length; i++) {
            newCartList = new Object();
            newCartList._id = data[i]._id;
            newCartList.userId = data[i].userId;
            newCartList.itemId = data[i].itemId;
            newCartList.itemName = data[i].itemName;
            newCartList.itemBrand = data[i].itemBrand;
            newCartList.itemPrice = data[i].itemPrice;
            newCartList.itemImgUrl = data[i].itemImgUrl;
            newCartList.count = data[i].itemCount;
            cartListArray[i] = newCartList;
          }

          console.log(cartListArray);
          localStorage.setItem("cart", JSON.stringify(cartListArray));
        }
      }
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

      this.getPhoneList();
    } catch (error) {
      console.error(error);
    }
  }
}

export default withAuth0(Home);
