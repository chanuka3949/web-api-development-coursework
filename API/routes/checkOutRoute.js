const express = require("express");
const checkOutModel = require("../models/checkOutModel");
const User = require("../models/userModel");
const MailManager = require("../services/MailManager");
const createError = require("http-errors");
const mongoose = require("mongoose");
const router = express.Router();

// get all phones details
router.get("/", async (req, res, next) => {
  try {
    let order = await checkOutModel.find();
    if (!order) {
      throw createError(404, "No orders in the system");
    }
    res.send(order);
  } catch (error) {
    if (error.name === "ValidationError") {
      return next(createError(422, error.message));
    }
    next(error);
  }
});

// get phones details according to the givven id
router.get("/:phoneId", async (req, res) => {
  let phoneData = await checkOutModel.findById(req.params.phoneId);

  if (!phoneData) {
    res.status(404).send("the givven id dose not in our server");
  }
  res.send(phoneData);
});

router.post("/", async (req, res, next) => {
  try {
    if (!req.body.userId) {
      throw createError(400, "Please Sign In");
    }
    if (!req.body.cartList || req.body.cartList.length === 0) {
      throw createError(400, "Please Add Items to Cart");
    }

    let user = await User.findOne({ uid: req.body.userId });

    if (
      typeof user.address === "undefined" ||
      typeof user.address.address1 === "undefined" ||
      typeof user.address.address2 === "undefined" ||
      typeof user.address.city === "undefined" ||
      typeof user.address.country === "undefined" ||
      typeof user.address.postalCode === "undefined" ||
      typeof user.address.contactNumber === "undefined"
    ) {
      throw createError(400, "Please Save Shipping Details Correctly");
    }
    

    let cartList = req.body.cartList;
    let userId = req.body.userId;
    let total = req.body.total;
    let newCartList = {
      userId: "",
      items: [],
      total: 0,
    };

    for (i = 0; i < cartList.length; i++) {
      newCartList.items.push(cartList[i]);
    }

    newCartList.userId = userId;
    newCartList.total = total;
    let newCheckOut = new checkOutModel(newCartList);

    let order = await newCheckOut.save();

    let manager = new MailManager();
    manager.preparePDF(order, user);

    res.send(order);
  } catch (error) {
    if (error.name === "ValidationError") {
      return next(createError(422, error.message));
    }
    next(error);
  }
});


//Edit phone details
router.put("/:phoneId", async (req, res) => {
  let phone = await checkOutModel.findById(req.params.phoneId);

  if (!phone) {
    return res.status(404).send("the givven id dose not in our server");
  }
  if (!req.body.name) {
    return res.status(400).send("Not all madatary values have been set !"); //validations
  }
  phone.set({ name: req.body.name });
  phone.set({ brand: req.body.brand });
  phone.set({ price: req.body.price });
  phone.set({ imgUrl: req.body.imgUrl });
  phone.set({ stockCount: req.body.stockCount });

  phone = await phone.save();
  res.send(phone);
});

//delete cart details
router.delete("/:itemId", async (req, res) => {
  let item = await checkOutModel.find({ itemId: req.params.itemId });
  let phoneId = await shoppingCartModel.findOneAndDelete({
    userId: item[0].userId,
    itemId: req.params.itemId,
  });
  res.send(phoneId);
});

module.exports = router;
