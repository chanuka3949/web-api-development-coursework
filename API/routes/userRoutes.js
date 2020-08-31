const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

router.get("/", async (req, res) => {
  try {
    let users = await User.find();
    if (!users) {
      return res.status(404).send({ message: "No users in the system" });
    }
    res.send(users);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

router.get("/:uid", async (req, res) => {
  try {
    let user = await User.findOne({ uid: req.params.uid });

    if (!user) {
      return res
        .status(404)
        .send({ message: "User does not exist in the system" });
    }
    res.send(user);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

router.post("/", async (req, res) => {
  if (!req.body.uid || !req.body.name || !req.body.email) {
    return res
      .status(400)
      .send({ message: "Mandatory fields cannot be null or empty" });
  }
  try {
    let newUser = new User({
      uid: req.body.uid,
      name: req.body.name,
      email: req.body.email,
      picture: req.body.picture,
      shippingAddress: req.body.shippingAddress,
    });

    let user = await newUser.save();
    res.send(user);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.put("/:uid", async (req, res) => {
  try {
    let user = await User.findOne({ uid: req.params.uid });

    if (!user) {
      return res
        .status(404)
        .send({ message: "User does not exist in the system" });
    }
    user.set({ address: req.body.address });

    user = await user.save();
    res.send(user);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

module.exports = router;
