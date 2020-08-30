const Phones = require("./routes/phoneRoute");
const Cart = require("./routes/shoppingCartRoute");
const CheckOut = require("./routes/checkOutRoute");
const Users = require("./routes/userRoutes");
const home = require("./routes/home");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const authenticator = require("./middleware/authenticator");

const app = express();
const port = 5000;

//middleware
//app.use(authenticator);

app.use(express.json());
app.use(cors());
app.use("/api/users", Users);
app.use("/api/phones", Phones);
app.use("/api/cart", Cart);
app.use("/api/checkOut", CheckOut);
app.use("/", home);

app.use(authenticator);

mongoose
  .connect("mongodb://localhost/phonedb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to DB sucessfully..."))
  .catch((err) => console.log("Error occured... : ", err));

app.listen(port, function () {
  console.log("Listing on port no " + port);
});
