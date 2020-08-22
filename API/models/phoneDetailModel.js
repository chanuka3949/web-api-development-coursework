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
        type: String,       
        required: true
    },

   
    imgUrl:{
        type: String,
       
    },

    stockCount : {
        type: String,       
        required: true
    },
});

const phoneModel = mongoose.model("phoneModel", phoneSchema);
module.exports = phoneModel;