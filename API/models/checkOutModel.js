const mongoose = require('mongoose');

const checkOutSchema = new mongoose.Schema({
 
    userId: {
        type: String,
        required: true
    },

    items : {
        type: Array,
        required: true
    },
    
    total: {
        type: String,
        required: true
    },

    date:{
        type: Date,
        default: new Date()
    }
});

const checkOutModel = mongoose.model("checkOutModel", checkOutSchema);
module.exports = checkOutModel;