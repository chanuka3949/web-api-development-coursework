import React, { Component } from "react";
import axios from "axios";
import CartSearch from "./CartSearch";
import Cart from "./Cart";
import NavBar from "../NavBar";
import Checkout from "./Checkout";
import Loading from "../Loading";
import { withAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import ShippingDetails from "./ShippingDetails";
import { toast } from "react-toastify";

class CartHome extends Component {
  state = {
    cartList: [],
    cartTotal: 0,
    cartQuantity: 0,
    currency: localStorage.getItem("Currency"),
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
        <div>
          <CartSearch />
        </div>
        <div className="container">
          <div className="row no-gutters">
            <div className="col-sm-8" style={{ marginTop: 100 }}>
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
            <div className="col-sm-4">
              <ShippingDetails />
              <Checkout
                checkout={() => {
                  this.chechkOut();
                }}
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
    axios.post(`http://localhost:5000/api/checkOut/`, {
      userId: localStorage.getItem("A"),
      cartList: this.state.cartList,
      total: 7
    }).then(
      (response) => {
        toast.success("Checkout Successful");
        this.deletefromCart();
        localStorage.removeItem("cart");
      },
      (error) => {
        toast.error(error.message);
      }
    )
   
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
        itemId: item._id
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

    let a = JSON.parse(localStorage.getItem("cart"));
    for(let i=0;i<a.length;i++){
      console.log(item.itemId);
     if(a[i]._id === item.itemId){
      console.log("hjkhjkgjkgjkgjkgkgjk");
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
        userId: localStorage.getItem("A"),
        itemId: item._id,
      });
      
    let cartList = [...this.state.cartList];
    let index = cartList.indexOf(item);
    cartList[index] = { ...item };
    cartList[index].itemCount--;
    this.setState({ cartList: cartList });
    this.calculateTotalAmount();

    let a = JSON.parse(localStorage.getItem("cart"));
    for(let i=0;i<a.length;i++){
      console.log(item.itemId);
     if(a[i]._id === item.itemId){
      console.log("hjkhjkgjkgjkgjkgkgjk");
     console.log(a[i].count);
     a[i].itemcount = a[i].count--;
     localStorage.setItem("cart", JSON.stringify(a));
     }}
    } catch (e) {
      if (e.response && e.response.data) {
        alert(e.response.data.message + e.response.status);
      //  alert(e.response.status);
      }
    }

  }

 
  async deleteCartItem(itemtodeleteid) {
    let newCart = this.state.cartList.filter(
      (item) => item.itemId !== itemtodeleteid
    );
    try{
    await axios.delete(`http://localhost:5000/api/cart/${itemtodeleteid}`, {
      userId: localStorage.getItem("A"),
    }).then(
      (response) => {
        toast.info("Removed");
      },
      (error) => {
        toast.error(error);
      }
    );
  } catch (e) {
    toast.error(e);
  }
    this.setState({ cartList: newCart });
    this.calculateTotalAmount();

    let a = JSON.parse(localStorage.getItem("cart"));
    for(let i=0;i<a.length;i++){
      console.log(a[i]._id);
     if(a[i]._id === itemtodeleteid){
      console.log("hjkhjkgjkgjkgjkgkgjk");
     console.log(a[i]);
     a.splice(i, 1); i--;
     localStorage.setItem("cart", JSON.stringify(a));
     }}
 
  // let newCart = JSON.parse(localStorage.getItem("cart"));
  // newCart.forEach((item) => {
  //   if (item._id === phone._id) {
  //     item.count++;
  //     count = item.count;
  //     alreadyInCart = true;
  //     update = true;
  //     this.setState({ cartCount: this.state.cartCount + 1 });
  //   }

  // localStorage.getItem("cart", JSON.stringify(this.state.cartItems));
  }

  async componentDidMount() {
    try {
      let { data } = await axios.get(`http://localhost:5000/api/cart/${localStorage.getItem("A")}`);
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
