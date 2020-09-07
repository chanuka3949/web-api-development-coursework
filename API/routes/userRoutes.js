const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const createError = require("http-errors");

router.get("/", async (req, res, next) => {
  try {
    let users = await User.find();
    if (!users) {
      throw createError(404, "No users in the system");
    }
    res.send(users);
  } catch (error) {
    if (error.name === "ValidationError") {
      return next(createError(422, error.message));
    }
    next(error);
  }
});

router.get("/:uid", async (req, res, next) => {
  try {
    let user = await User.findOne({ uid: req.params.uid });

    if (!user) {
      throw createError(404, "User does not exist in the system");
    }
    res.send(user);
  } catch (error) {
    if (error.name === "ValidationError") {
      return next(createError(422, error.message));
    }
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    if (!req.body.uid || !req.body.name || !req.body.email) {
      throw createError(400, "Mandatory fields cannot be null or empty");
    }

    let newUser = new User({
      uid: req.body.uid,
      name: req.body.name,
      email: req.body.email,
      picture: req.body.picture,
      shippingAddress: req.body.shippingAddress,
    });

    let user = await newUser.save();
    res.send(user);
  } catch (error) {
    if (error.name === "ValidationError") {
      return next(createError(422, error.message));
    }
    next(error);
  }
});

router.put("/:uid", async (req, res, next) => {
  try {
    let user = await User.findOne({ uid: req.params.uid });

    if (!user) {
      throw createError(404, "User does not exist in the system");
    }
    if (typeof req.body.name === "undefined") {
      user.set({ address: req.body.address });
    } else {
      user.set({ address: req.body.address, name: req.body.name });
    }
    user = await user.save();
    res.send(user);
  } catch (error) {
    if (error.name === "ValidationError") {
      return next(createError(422, error.message));
    }
    next(error);
  }
});

module.exports = router;
