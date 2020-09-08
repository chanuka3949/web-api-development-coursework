const express = require("express");
const shoppingCartModel = require("../models/shoppingCartModel");
const router = express.Router();
const createError = require("http-errors");

// get all cart details
router.get("/", async (req, res) => {
  try {
    let phones = await phoneModel.find();
    if (!phones) {
      throw createError(404, "No users in the system");
      return res.status(404).send({ message: "No Cart Data Available" });
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

//Edit cart details
// router.put("/:itemId", async (req, res) => {
//   let cartEdit = await shoppingCartModel.findById(req.params.itemId);

//   if (!cartEdit) {
//     return res.status(404).send("the givven id dose not in our server");
//   }
//   if (!req.body.itemCount) {
//     return res.status(400).send("Not all madatary values have been set !"); //validations
//   }

//   cartEdit.set({ itemCount: req.body.itemCount });
//  // cartEdit.set({ itemprice: req.body.itemprice });

//   cartEdit = await cartEdit.save();
//   res.send(cartEdit);
// });

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

//Edit cart details
// router.put("/:itemId", async (req, res) => {
//   let itemId = req.params.itemId;
//   let userId = req.body.userId
//   let cartEdit = await shoppingCartModel.findOneAndUpdate(
//     {itemId: req.params.itemId, userId: userId},
//     { $set: { itemCount: req.body.itemCount}},
//     { new: true, useFindAndModify: false }
// );

//   res.send(cartEdit);
// });

//delete cart details
router.delete("/:itemId", async (req, res, next) => {
  let item = await shoppingCartModel.find({ itemId: req.params.itemId });
  console.log(item);
  let phoneId = await shoppingCartModel.findOneAndDelete({
    userId: item[0].userId,
    itemId: req.params.itemId,
  });
  res.send(phoneId);
});

router.delete("/deletecart/:userId", async (req, res, next) => {
  try {
    let items = await shoppingCartModel.find({ userId: req.params.userId });

    if (items.length === 0) {
      throw createError(400, "No Items In The Cart");
    }
    let phoneId = "";
    for (i = 0; i < items.length; i++) {
      phoneId = await shoppingCartModel.findOneAndDelete({
        itemId: items[i].itemId,
        userId: req.params.userId,
      });
    }
    res.send(phoneId);
  } catch (error) {
    if (error.name === "ValidationError") {
      next(createError(422, error.message));
      return;
    }
    next(error);
  }
});


// ProductModel.findOneAndDelete({ brand: 'Nike' }, function (err) {
//   if(err) console.log(err);
//   console.log("Successful deletion");
// });
module.exports = router;
