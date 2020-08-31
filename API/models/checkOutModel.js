const mongoose = require('mongoose');

const checkOutSchema = new mongoose.Schema({
    
    userId: {
        type: String,
        required: true
    },

    itemId : {
        type: String,
        required: true
    },
    
    itemName: {
        type: String,
        required: true
    },
    
    itembrand : {
        type: String,
        required: true
    },

    itemprice : {
        type: Number,       
        required: true
    },

    itemimgUrl:{
        type: String,
       
    },

    itemCount : {
        type: Number,       
        required: true
    },
});

const checkOutModel = mongoose.model("checkOutModel", checkOutSchema);
module.exports = checkOutModel;