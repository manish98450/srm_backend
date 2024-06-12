//import mongoose
const mongoose = require('mongoose')
//create schema
const productSchema = new mongoose.Schema({
    p_id: Number,
    p_img: String,
    p_cost: Number,
    u_name: String
})
module.exports = mongoose.model("Cart", productSchema)
