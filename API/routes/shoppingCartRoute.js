const express = require("express");
const shoppingCartModel = require("../models/shoppingCartModel");
const router = express.Router();
const createError = require("http-errors");
const mongoose = require("mongoose");

// get all cart details
router.get("/", async (req, res, next) => {
  try {
    let phones = await phoneModel.find();
    if (!phones) {
      throw createError(404, "No users in the system");
      //return res.status(404).send({ message: "No Cart Data Available" });
    }
    res.send(phones);
  } catch (error) {
    if (error.name === "ValidationError") {
      return next(createError(422, error.message));
    }
    next(error);
  }
});

// get cart details according to the givven id
router.get("/:userId", async (req, res, next) => {
  try {
    let shoppingCartData = await shoppingCartModel.find({
      userId: req.params.userId,
    });

    if (shoppingCartData.length === 0) {
      throw createError(404, "The given id dose not in our server");
    }
    res.send(shoppingCartData);
  } catch (error) {
    if (error instanceof mongoose.CastError) {
      next(createError(400, "invalid id"));
      return;
    }
    next(error);
  }
});

//adding to shopping cart
router.post("/", async (req, res, next) => {
  try {
    if (!req.body.userId) {
      throw createError(400, "Please Sign In");
    }
    let cartDataToBeAddedDb = new shoppingCartModel({
      userId: req.body.userId,
      itemId: req.body.itemId,
      itemName: req.body.itemName,
      itemBrand: req.body.itemBrand,
      itemPrice: req.body.itemPrice,
      itemImgUrl: req.body.itemImgUrl,
      itemCount: req.body.itemCount,
    });

    let cartDataToBeAdded = await cartDataToBeAddedDb.save();
    res.send(cartDataToBeAdded);
  } catch (error) {
    if (error.name === "ValidationError") {
      return next(createError(422, error.message));
    }
    next(error);
  }
});

router.put("/:phoneId", async (req, res, next) => {
  try {
    let itemId = req.params.phoneId;
    let userId = req.body.userId;

    if (req.body.itemCount <= 0) {
      throw createError(400, "Minus values are not accepted");
    }

    let cartEdit = await shoppingCartModel.findOneAndUpdate(
      { itemId: req.params.phoneId, userId: userId },
      { $set: { itemCount: req.body.itemCount } },
      { new: true, useFindAndModify: false }
    );

    res.send(cartEdit);
  } catch (error) {
    if (error instanceof mongoose.CastError) {
      next(createError(400, "invalid id"));
      return;
    }
    next(error);
  }
});

//delete cart details
router.delete("/:itemId", async (req, res, next) => {
  try {
    let item = await shoppingCartModel.find({ itemId: req.params.itemId });
    let phoneId = await shoppingCartModel.findOneAndDelete({
      userId: item[0].userId,
      itemId: req.params.itemId,
    });
    if (!phoneId) {
      throw createError(404, "The givven id is not in ouer server");
    }
    res.send(phoneId);
  } catch (error) {
    if (error instanceof mongoose.CastError) {
      next(createError(400, "invalid id"));
      return;
    }
    next(error);
  }
});

router.delete("/deletecart/:userId", async (req, res, next) => {
  try {
    let cart = await shoppingCartModel.deleteMany({
      userId: req.params.userId,
    });

    if (cart.deletedCount === 0) {
      throw createError(400, "No Items In The Cart");
    }

    res.send(cart);
  } catch (error) {
    if (error.name === "ValidationError") {
      next(createError(422, error.message));
      return;
    }
    next(error);
  }
});

module.exports = router;
