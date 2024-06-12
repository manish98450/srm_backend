//import express module
const express = require('express')
//create router instance
const router = express.Router()
//import cartApi
const cartApi = require('../apis/cartApis')
//fetch all records
router.get("/cart_fetch", cartApi.products_all)
//insert a record
router.post("/cart_insert", cartApi.insert_product)
//update a record
router.put("/cart_update", cartApi.update_product)
//delete a record
router.delete("/cart_delete", cartApi.delete_product)
//export router
module.exports = router
