const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);


const cartSchema = new mongoose.Schema({
    productid: Number,
    userid: String,
})

cartSchema.plugin(AutoIncrement, { inc_field: 'cartid' });

const cartmodel = new mongoose.model("cart", cartSchema)
module.exports = cartmodel;