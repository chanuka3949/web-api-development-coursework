const Phones = require("./routes/phoneRoute");
const Cart = require("./routes/shoppingCartRoute");
const home = require("./routes/home");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
const port = 5500

app.use(express.json());
app.use(cors());
app.use("/api/phones", Phones);
app.use("/api/cart", Cart);
app.use("/", home);

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
