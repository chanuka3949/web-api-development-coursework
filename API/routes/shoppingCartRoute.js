const express = require("express");
const shoppingCartModel = require("../models/shoppingCartModel");
const router = express.Router();

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
router.get("/:userId", async (req, res) => {
  let shoppingCartData = await shoppingCartModel.find({
    userId: req.params.userId,
  });

  if (!shoppingCartData) {
    res.status(404).send("the given id dose not in our server");
  }
  res.send(shoppingCartData);
});

//adding to shopping cart
router.post("/", async (req, res) => {

  if (!req.body.userId) {
    return res.status(400).send("Not all madatary values have benn set !");
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


router.put("/:phoneId", async (req, res) => {
  let itemId = req.params.phoneId;
  let userId = req.body.userId;

  if (req.body.itemCount <= 0) {
    return res.status(400).json({ message: "Minus values are not accepted" });
  }
  // if (req.body.itemCount > 5)  {
  //   return res.status(400).json({ message: "Not in stock" });
  // } 
  let cartEdit = await shoppingCartModel.findOneAndUpdate(
    { itemId: req.params.phoneId, userId: userId },
    { $set: { itemCount: req.body.itemCount } },
    { new: true, useFindAndModify: false }
  );
  
  res.send(cartEdit);
});


//delete cart details
router.delete("/:itemId", async (req, res) => {
  try{
  let item = await shoppingCartModel.find({ itemId: req.params.itemId });
  let phoneId = await shoppingCartModel.findOneAndDelete({
    userId: item[0].userId,
    itemId: req.params.itemId,
  });
  if (!phoneId) {
    throw createError(404, "The givven id is not in ouer server");
  }
  res.send(phoneId);
}
catch (error) {
  if (error instanceof mongoose.CastError) {
    next(createError(400, "invalid id"));
    return;
  }
  next(error);
}
});

router.delete("/deletecart/:userId", async (req, res) => {
  let items = await shoppingCartModel.find({ userId: req.params.userId });
  console.log(items.length);
  let phoneId = "";
  for (i = 0; i < items.length; i++) {
    phoneId = await shoppingCartModel.findOneAndDelete({
      itemId: items[i].itemId,
      userId: req.params.userId,
    });
  }
  res.send(phoneId);
});

// ProductModel.findOneAndDelete({ brand: 'Nike' }, function (err) {
//   if(err) console.log(err);
//   console.log("Successful deletion");
// });
module.exports = router;
