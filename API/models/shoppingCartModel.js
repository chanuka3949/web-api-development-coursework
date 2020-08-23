const mongoose = require('mongoose');

const shoppingCartSchema = new mongoose.Schema({
    
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
        type: String,       
        required: true
    },

    itemimgUrl:{
        type: String,
       
    },

    itemCount : {
        type: String,       
        required: true
    },
});

const shoppingCartModel = mongoose.model("shoppingCartModel", shoppingCartSchema);
module.exports = shoppingCartModel;