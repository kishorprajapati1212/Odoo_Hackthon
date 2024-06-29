const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const ProductSchema = new mongoose.Schema({
    productid: Number,
    name: String,
    rentingPrice: Number,
    image: String,
    description: String,
    category: String,
    stock: Number,
    und2: String,
    und3: String,
})
ProductSchema.plugin(AutoIncrement, { inc_field: 'productid' });

const ProductModel = mongoose.model('addproducts',ProductSchema);
module.exports = ProductModel;