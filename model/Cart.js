//import mongoose
const mongoose = require('mongoose')
//create schema
const productSchema = new mongoose.Schema({
    
    u_name: String,
    p_name: String,
    p_id: Number,  
    qty: Number,
    p_cost: Number,
    p_img: String
})
module.exports = mongoose.model("Cart", productSchema)
