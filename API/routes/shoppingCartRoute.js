const express = require("express");
const shoppingCartModel = require("../models/shoppingCartModel");
const router = express.Router();

// get all cart details
router.get("/", async (req, res) => {
  try {
    let phones = await phoneModel.find();
    if (!phones) {
      return res.status(404).send({ message: "No Cart Data Available" });
    }
    res.send(phones);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});


// get cart details according to the givven id
router.get("/:userId", async (req, res) => {
  let shoppingCartData = await shoppingCartModel.find({userId : req.params.userId});

  if (!shoppingCartData) {
    res.status(404).send("the given id dose not in our server");
  }
  res.send(shoppingCartData);
});


//create records
router.post("/", async (req, res) => {
  if (!req.body.userId) {
    return res.status(400).send("Not all madatary values have benn set !"); //validations
  }
  try {
    let cartDataToBeAddedDb = new shoppingCartModel({
        userId: req.body.userId,
        itemId: req.body.itemId,
        itemName: req.body.itemName,
        itembrand: req.body.itembrand,
        itemprice: req.body.itemprice,
        itemimgUrl: req.body.itemimgUrl,
        itemCount: req.body.itemCount,
    });
    
    let cartDataToBeAdded = await cartDataToBeAddedDb.save();
    res.send(cartDataToBeAdded);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});


//Edit cart details
router.put("/:userId", async (req, res) => {
  let phone = await phoneModel.findById(req.params.phoneId);

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
router.delete("/:phoneId", async (req, res) => {
  let phoneId = await phoneModel.findOneAndDelete({ _id: req.params.phoneId });
  if (!phoneId) {
    res.status(404).send("the givven id dose not in our server");
  }
  res.send(phoneId);
});

module.exports = router;
