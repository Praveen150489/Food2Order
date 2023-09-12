const order_model = require("../models/orders.model.js");
const utility =require('../utility/util.js')

var getOrders=(req, res) => {
   // Validate request
   // console.log("method called")
   // var result=restaurant_model.mongodb_get_restaurant()
   // res.send(result)

   order_model.mongodb_get_orders().then(
      function(orders){
         const objArr = orders
         objArr.forEach(o => {
            utility.renamekey(o, '_id', 'id')
         });
         res.send(orders)
      },
      function(err){
         console.log(err);
      }
   )
   
}

var createOrder=(req,res) => {
   //restaurant_model.mongodb_add_restaurant()
   // console.log("method called");
   // var result=restaurant_model.mongodb_add_restaurant()
   // res.send(result)

   if(!req.body.restaurant_id) {
      res.status(400).send({message: "Content can not be empty!"});
      return;
   }

   // Create a Order
   const order = {
      _id:req.body.id,
      restaurant_id: req.body.restaurant_id,
      order_date: req.body.order_date,
      dishes_ids: req.body.dishes_ids,
      num_of_dishes: req.body.num_of_dishes,
      user_id: req.body.user_id,
      total_order: req.body.total_order
   };

   // Save Restaurant in the database
   order_model.mongodb_add_order(order)
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

var updateOrder=(req,res) => {
   console.log(req.params.id);
   var rid=parseInt(req.params.id);
   
   if(!req.params) {
      res.status(400).send({message: "Content can not be empty!"});
      return;
   }

   // Create a Order
   const order = {
    _id:rid,
    restaurant_id: req.body.restaurant_id,
    order_date: req.body.order_date,
    dishes_ids: req.body.dishes_ids,
    num_of_dishes: req.body.num_of_dishes,
    user_id: req.body.user_id,
    total_order: req.body.total_order
   };

   // Update Restaurant in the database
   order_model.mongodb_update_order(order)
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

var deleteOrder=(req,res) => {
   console.log(req.params.id);
   var rid=parseInt(req.params.id);
   
   if(!req.params) {
      res.status(400).send({message: "Content can not be empty!"});
      return;
   }

   // Create a Order
   const order = {
    _id:rid,
    restaurant_id: req.body.restaurant_id,
    order_date: req.body.order_date,
    dishes_ids: req.body.dishes_ids,
    num_of_dishes: req.body.num_of_dishes,
    user_id: req.body.user_id,
    total_order: req.body.total_order
   };

   // Delete Restaurant in the database
   order_model.mongodb_delete_order(order)
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

var getOrderById=(req,res) => {
   console.log(req.params.id);
   var rid=parseInt(req.params.id);
   
   if(!req.params) {
      res.status(400).send({message: "Content can not be empty!"});
      return;
   }

   // Create a Order
   const order = {
    _id:rid,
    restaurant_id: req.body.restaurant_id,
    order_date: req.body.order_date,
    dishes_ids: req.body.dishes_ids,
    num_of_dishes: req.body.num_of_dishes,
    user_id: req.body.user_id,
    total_order: req.body.total_order
   };

   // Delete Restaurant in the database
   order_model.mongodb_get_order_by_id(order)
      .then(data => {
         console.log("Controller get by id received: "+JSON.stringify(data))
         res.send(data);
      })
      .catch(err => {
         res.status(500).send({
            message: err.message || "some error occured while getting the Restaurant by id from mongoDB"
         });
      });
}

module.exports={getOrders,createOrder,updateOrder,deleteOrder,getOrderById}