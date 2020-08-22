import React, { Component } from "react";
import StoreItem from "./StoreItem";
import axios from "axios";
import CartSearch from "./CartSearch"

class Home extends Component {
  state = {
    phoneList: [],
  };

  render() {
    return (
     <React.Fragment>
        <div>
        <CartSearch/>
      </div>
        <div
          className="card-deck"
          style={{
            marginLeft: 150,
            marginRight: 150,
            marginTop: 50,
            marginBottom: 300,
          }}
        >
          {this.state.phoneList.map((phone) => (
          <StoreItem key={phone._id} phone={phone}/>
          ))}
      </div>
     </React.Fragment>
    );
  }

  async componentDidMount() {
    let {data} = await axios.get("http://localhost:5000/api/phones/");
    this.setState({phoneList: data})
  }
}

export default Home;
