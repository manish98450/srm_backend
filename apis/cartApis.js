//import db schema
const Product = require('../model/Cart')
//get all products
const products_all = async (req, res) => {
     try {
          const products = await Product.find()
          console.log('Data sent')
          res.json(products)
     }
     catch (error) {
          console.log('Fetch error :- ', error)
          res.json({ 'message': error })
     }
}
//insert a product
const insert_product = async (req, res) => {
     const product = new Product({
          
          u_name: req.body.u_name,
          p_name: req.body.p_name,
          p_id:req.body.p_id,
          qty:req.body.qty,
          p_cost: req.body.p_cost,
          p_img:req.body.p_img,
          
     })
     try {
          const savedProduct = await product.save()
          console.log('Product inserted')
          res.send(savedProduct)
     }
     catch (error) {
          res.status(400).send(error)
     }
}
//update product
const update_product = async (req, res) => {
     let p_id = req.body.p_id;
     let u_name = req.body.u_name;
     const product = {
         u_name: req.body.u_name,
         p_id: req.body.p_id,
         qty: req.body.qty,
     };
     try {
         const updateProduct = await Product.updateOne(
             { p_id: p_id, u_name: u_name },  // Ensure both p_id and u_name match
             { $set: product }                // Use $set to update specific fields
         );
         if (updateProduct.modifiedCount != 0) {
             console.log('Product Updated', updateProduct);
             res.send({ 'update': 'success' });
         } else {
             console.log('Product not updated');
             res.send({ 'update': 'Record Not Found' });
         }
     } catch (error) {
         res.status(400).send(error);
     }
 };
 


//delete product
const delete_product = async (req, res) => {
     let p_id = req.body.p_id
     try {
          const deletedproduct = await Product.deleteOne({ p_id })
          if (deletedproduct.deletedCount != 0) {
               console.log('Product Deleted')
               res.send({ 'delete': 'success' })
          }
          else {
               console.log('Product Not deleted')
               res.send({ 'delete': 'Record Not Found' })
          }
     }
     catch (error) {
          res.status(400).send(error)
     }
}
module.exports = {
     products_all,
     insert_product,
     update_product,
     delete_product
}