const mongoose = require('mongoose');

const phoneSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    brand : {
        type: String,
        required: true
    },

    price : {
        type: Number,       
        required: true
    },

   
    imgUrl:{
        type: String,
       
    },

    stockCount : {
        type: Number,       
        required: true
    },
});

const phoneModel = mongoose.model("phoneModel", phoneSchema);
module.exports = phoneModel;