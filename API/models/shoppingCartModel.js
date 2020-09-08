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
    
    itemBrand : {
        type: String,
        required: true
    },

    itemPrice : {
        type: Number,       
        required: true
    },

    itemImgUrl:{
        type: String,
       
    },

    itemCount : {
        type: Number,       
        required: true
    },
});
const shoppingCartModel = mongoose.model("shoppingCartModel", shoppingCartSchema);
module.exports = shoppingCartModel;