const express = require("express");
const checkOutModel = require("../models/checkOutModel");
const User = require("../models/userModel");
const MailManager = require("../services/MailManager");
const router = express.Router();

// get all phones details
router.get("/", async (req, res) => {
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

//create records
// router.post("/", async (req, res) => {
//     // if (!req.body.userId) {
//     //   return res.status(400).send("Not all madatary values have benn set !"); //validations
//     // }
//        let cartList = req.body.cartList;
//        let userId = req.body.userId;
//        var newCartList ={
//          userId:"",
//          itemId: "",
//          itemName:"",
//          itembrand:"",
//          itemprice: 0,
//          itemimgUrl: "",
//          itemCount: 0,
//        };
//        let newCartList2=[];

//       for (i = 0; i < cartList.length; i++) {
//         newCartList = new Object();
//          newCartList.userId = cartList[i].userId;
//          newCartList.itemId = cartList[i].itemId;
//          newCartList.itemName = cartList[i].itemName;
//          newCartList.itembrand = cartList[i].itembrand;
//          newCartList.itemprice = cartList[i].itemprice;
//          newCartList.itemimgUrl =  cartList[i].itemimgUrl;
//          newCartList.itemCount = cartList[i].itemCount;
//          newCartList2[i] = newCartList;
//       }
//       console.log(newCartList2);

//       let a = await checkOutModel.insertMany(newCartList2)
//       res.send(a);
//     });

router.post("/", async (req, res, next) => {
  try {

    console.log(req.body.total)
    if (!req.body.total) {
      throw createError(400, "Pleae log!");
    }

    console.log(req.body.cartList)
    if (!req.body.cartList) {
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
