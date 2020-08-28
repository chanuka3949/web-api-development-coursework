const express = require("express");
const phoneModel = require("../models/phoneDetailModel");
const router = express.Router();

// get all phones details
router.get("/", async (req, res) => {
  try {
    let phones = await phoneModel.find();
    if (!phones) {
      return res.status(404).send({ message: "No Phones Available" });
    }
    res.send(phones);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

// get phones details according to the givven id
router.get("/:phoneId", async (req, res) => {
  let phoneData = await phoneModel.findById(req.params.phoneId);

  if (!phoneData) {
    res.status(404).send("the given id dose not in our server");
  }
  res.send(phoneData);
});

//create records
router.post("/", async (req, res) => {
  if (!req.body.brand) {
    return res.status(400).send("Not all mandatory values have been set!"); //validations
  }
  try {
    let phoneDataToBeAddedDb = new phoneModel({
      name: req.body.name,
      brand: req.body.brand,
      price: req.body.price,
      imgUrl: req.body.imgUrl,
      stockCount: req.body.stockCount,
    });

    let phoneDataToBeAdded = await phoneDataToBeAddedDb.save();
    res.send(phoneDataToBeAdded);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

//Edit phone details
router.put("/:phoneId", async (req, res) => {
  let phone = await phoneModel.findById(req.params.phoneId);

  if (!phone) {
    return res.status(404).send("the given id dose not in our server");
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

//delete phone details
router.delete("/:phoneId", async (req, res) => {
  let phoneId = await phoneModel.findOneAndDelete({ _id: req.params.phoneId });
  if (!phoneId) {
    res.status(404).send("the givven id dose not in our server");
  }
  res.send(phoneId);
});

module.exports = router;
