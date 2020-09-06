const Phones = require("./routes/phoneRoute");
const Cart = require("./routes/shoppingCartRoute");
const CheckOut = require("./routes/checkOutRoute");
const Users = require("./routes/userRoutes");
const home = require("./routes/home");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const notFoundHandler = require("./middleware/notFoundHandler");
const errorHandler = require("./middleware/errorHandler");
require('dotenv').config()

const app = express();
const port = process.env.PORT || 5500;

app.use(express.json());
app.use(cors());
app.use("/api/users", Users);
app.use("/api/cart", Cart);
app.use("/api/checkOut", CheckOut);
app.use("/", home);
app.use("/api/phones", Phones);

//Middleware
app.use(notFoundHandler);
app.use(errorHandler);

mongoose
  .connect(process.env.MONGO_DB_PATH, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to DB sucessfully..."))
  .catch((err) => console.log("Error occured... : ", err));

app.listen(port, function () {
  console.log("Listing on port no " + port);
});
