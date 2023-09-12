const cart_model = require("../models/carts.model.js");
const utility =require('../utility/util.js')

var getCarts=(req, res) => {
   // Validate request
   // console.log("method called")
   // var result=restaurant_model.mongodb_get_restaurant()
   // res.send(result)

   cart_model.mongodb_get_carts().then(
      function(carts){
         const objArr = carts
         objArr.forEach(o => {
            utility.renamekey(o, '_id', 'id')
         });
         res.send(carts)
      },
      function(err){
         console.log(err);
      }
   )
   
}

var createCart=(req,res) => {
   //restaurant_model.mongodb_add_restaurant()
   // console.log("method called");
   // var result=restaurant_model.mongodb_add_restaurant()
   // res.send(result)

   if(!req.body.id) {
      res.status(400).send({message: "Content can not be empty!"});
      return;
   }

   // Create a Cart
   const cart = {
      _id:req.body.id,
      dish_ids: req.body.dish_ids,
      number_of_each_dish: req.body.number_of_each_dish,
      cart_restaurant_id: req.body.cart_restaurant_id,
      total: req.body.total
   };

   // Save Restaurant in the database
   cart_model.mongodb_add_cart(cart)
      .then(data => {
         console.log("Controller received: "+JSON.stringify(data))
         res.send(data);
      })
      .catch(err => {
         res.status(500).send({
            message: err.message || "some error occured while creating the User in mongoDB"
         });
      });
}

var updateCart=(req,res) => {
   console.log(req.params.id);
   var rid=parseInt(req.params.id);
   
   if(!req.params) {
      res.status(400).send({message: "Content can not be empty!"});
      return;
   }

   // Create a Cart
   const cart = {
    _id:rid,
    dish_ids: req.body.dish_ids,
    number_of_each_dish: req.body.number_of_each_dish,
    cart_restaurant_id: req.body.cart_restaurant_id,
    total: req.body.total
   };

   // Update Restaurant in the database
   cart_model.mongodb_update_cart(cart)
      .then(data => {
         console.log("Controller update received: "+JSON.stringify(data))
         res.send(data);
      })
      .catch(err => {
         res.status(500).send({
            message: err.message || "some error occured while updating the Restaurant in mongoDB"
         });
      });
}

var deleteCart=(req,res) => {
   console.log(req.params.id);
   var rid=parseInt(req.params.id);
   
   if(!req.params) {
      res.status(400).send({message: "Content can not be empty!"});
      return;
   }

   // Create a Cart
   const cart = {
    _id:rid,
    dish_ids: req.body.dish_ids,
    number_of_each_dish: req.body.number_of_each_dish,
    cart_restaurant_id: req.body.cart_restaurant_id,
    total: req.body.total
   };

   // Delete Restaurant in the database
   cart_model.mongodb_delete_cart(cart)
      .then(data => {
         console.log("Controller update received: "+JSON.stringify(data))
         res.send(data);
      })
      .catch(err => {
         res.status(500).send({
            message: err.message || "some error occured while updating the Restaurant in mongoDB"
         });
      });
}

var getCartById=(req,res) => {
   console.log(req.params.id);
   var rid=parseInt(req.params.id);
   
   if(!req.params) {
      res.status(400).send({message: "Content can not be empty!"});
      return;
   }

   // Create a Cart
   const cart = {
    _id:rid,
    dish_ids: req.body.dish_ids,
    number_of_each_dish: req.body.number_of_each_dish,
    cart_restaurant_id: req.body.cart_restaurant_id,
    total: req.body.total
   };

   // Delete Restaurant in the database
   cart_model.mongodb_get_cart_by_id(cart)
      .then(data => {
         console.log("Controller get by id received: "+JSON.stringify(data));
         let cart_temp=data;
         utility.renamekey(cart_temp,'_id','id');
         res.send(data);
      })
      .catch(err => {
         res.status(500).send({
            message: err.message || "some error occured while getting the Restaurant by id from mongoDB"
         });
      });
}

module.exports={getCarts,createCart,updateCart,deleteCart,getCartById}