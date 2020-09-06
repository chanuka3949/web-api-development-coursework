const express = require("express");
const phoneModel = require("../models/phoneDetailModel");
const router = express.Router();
const createError = require("http-errors");
const mongoose = require("mongoose");

// get all phones details
router.get("/", async (req, res) => {
  try {
    let phones = await phoneModel.find();
    if (!phones) {
      throw createError(404, "No phones in the system");
    }
    res.send(phones);
  } catch (error) {
    if (error.name === "ValidationError") {
      return next(createError(422, error.message));
    }
    next(error);
  }
});


//get phones details according to the givven id
router.get("/:name", async (req, res, next) => {
  try {
   // let phoneData = await phoneModel.findById(req.params.phoneId);
   let phoneData = await phoneModel.find({ name: req.params.name,});
    if (!phoneData) {
      throw createError(404, "The givven id is not in ouer server");
    }
    res.send(phoneData);
  } catch (error) {
    //console.log(error.message);
    if (error instanceof mongoose.CastError) {
      next(createError(400, "invalid id"));
      return;
    }
    next(error); //error coming in the catch block
  }
});


//create records
router.post("/", async (req, res, next) => {
  try {
    let phoneDataToBeAddedDb = new phoneModel({
      name: req.body.name,
      brand: req.body.brand,
      price: req.body.price,
      imgUrl: req.body.imgUrl,
      stockCount: req.body.stockCount,
    });
    // if (!req.body) {
    //   throw createError(404, "not given values"); //validations
    // }
    let phoneDataToBeAdded = await phoneDataToBeAddedDb.save();
    res.send(phoneDataToBeAdded);
  } catch (error) {
    //console.log(error.message);
    if (error.name === "ValidationError") {
      next(createError(422, error.message));
      return;
    }
    next(error);
  }
});

//Edit phone details
router.put("/:phoneId", async (req, res, next) => {
  try {
    let phone = await phoneModel.findOneAndUpdate(
      { _id: req.params.phoneId },
      {
        $set: {
          name: req.body.name,
          brand: req.body.brand,
          imgUrl: req.body.imgUrl,
          stockCount: req.body.stockCount,
        },
      },

      { new: true, useFindAndModify: false }
    );
    if (!phone) {
      throw createError(404, "The givven id is not in ouer server");
    }
    res.send(phone);
  } catch (error) {
    //console.log(error.message);
    if (error instanceof mongoose.CastError) {
      next(createError(400, "invalid id"));
      return;
    }
    next(error);
  }
});

//delete phone details
router.delete("/:phoneId", async (req, res, next) => {
  try {
    let phoneId = await phoneModel.findOneAndDelete({
      _id: req.params.phoneId,
    });
    if (!phoneId) {
      throw createError(404, "The givven id is not in ouer server");
    }
    res.send(phoneId);
  } catch (error) {
    //console.log(error.message);
    if (error instanceof mongoose.CastError) {
      next(createError(400, "invalid id"));
      return;
    }
    next(error);
  }
});

module.exports = router;
