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
router.put("/:itemId", async (req, res) => {
  let cartEdit = await shoppingCartModel.findById(req.params.itemId);

  if (!cartEdit) {
    return res.status(404).send("the given id dose not in our server");
  }
  if (!req.body.itemCount) {
    return res.status(400).send("Not all madatary values have been set !"); //validations
  }

  cartEdit.set({ itemCount: req.body.itemCount });
  //cartEdit.set({ itemprice: req.body.itemprice });
 
  cartEdit = await cartEdit.save();
  res.send(cartEdit);
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
