
const restaurant_model = require("../models/restaurants.model.js");
const utility =require('../utility/util.js')

var getOwnerRestaurants = (req,res) => {

   if(!req.params) {
      res.status(400).send({message: "Content can not be empty!"});
      return;
   }

   console.log(req.params.id);
   var r_o_id=parseInt(req.params.id);

   // Create a Restaurant
   const restaurant = {
      r_Owner_Id: r_o_id,
      cty: req.body.city
   };

   restaurant_model.mongodb_get_restaurant_by_owner_id(restaurant)
      .then(data => {
         console.log("Controller get by owner id received: "+JSON.stringify(data))
         var arrRestaurants = [];
         var flag = 1;
         var count = 0;
         const objArr = data;
         objArr.forEach(o => {
            flag = 1;
            o.r_Addresses.forEach(d => {
               if(d.city == restaurant.cty && flag == 1){
                  arrRestaurants.push(o);
                  flag = 0;
                  count++;
               }
            })
         })
         arrRestaurants.push({"Total count of restaurants in particular city" : count});
         res.send(arrRestaurants);
         
      })
      .catch(err => {
         res.status(500).send({
            message: err.message || "some error occured while getting the Restaurant by owner id from mongoDB"
         });
      });
}

var getRestaurant=(req, res) => {
   // Validate request
   // console.log("method called")
   // var result=restaurant_model.mongodb_get_restaurant()
   // res.send(result)

   restaurant_model.mongodb_get_restaurant().then(
      function(restaurants){
         const objArr = restaurants
         objArr.forEach(o => {
            utility.renamekey(o, '_id', 'id')
         });
         res.send(restaurants)
      },
      function(err){
         console.log(err);
      }
   )
   
}

var createRestaurant=(req,res) => {
   //restaurant_model.mongodb_add_restaurant()
   // console.log("method called");
   // var result=restaurant_model.mongodb_add_restaurant()
   // res.send(result)

   if(!req.body.r_Name) {
      res.status(400).send({message: "Content can not be empty!"});
      return;
   }

   // Create a Restaurant
   const restaurant = {
      _id:req.body.id,
      r_Name: req.body.r_Name,
      r_Img_Path: req.body.r_Img_Path,
      r_Owner_Id: req.body.r_Owner_Id,
      r_Addresses: req.body.r_Addresses,
      r_Dishes: req.body.r_Dishes
   };

   // Save Restaurant in the database
   restaurant_model.mongodb_add_restaurant(restaurant)
      .then(data => {
         console.log("Controller received: "+JSON.stringify(data))
         res.send(data);
      })
      .catch(err => {
         res.status(500).send({
            message: err.message || "some error occured while creating the Restaurant in mongoDB"
         });
      });
}

var updateRestaurant=(req,res) => {
   console.log(req.params.id);
   var rid=parseInt(req.params.id);
   
   if(!req.params) {
      res.status(400).send({message: "Content can not be empty!"});
      return;
   }

   // Create a Restaurant
   const restaurant = {
      _id:rid,
      r_Name: req.body.r_Name,
      r_Img_Path: req.body.r_Img_Path,
      r_Owner_Id: req.body.r_Owner_Id,
      r_Addresses: req.body.r_Addresses,
      r_Dishes: req.body.r_Dishes
   };

   // Update Restaurant in the database
   restaurant_model.mongodb_update_restaurant(restaurant)
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

var deleteRestaurant=(req,res) => {
   console.log(req.params.id);
   var rid=parseInt(req.params.id);
   
   if(!req.params) {
      res.status(400).send({message: "Content can not be empty!"});
      return;
   }

   // Create a Restaurant
   const restaurant = {
      _id:rid,
      r_Name: req.body.r_Name,
      r_Img_Path: req.body.r_Img_Path,
      r_Owner_Id: req.body.r_Owner_Id,
      r_Addresses: req.body.r_Addresses,
      r_Dishes: req.body.r_Dishes
   };

   // Delete Restaurant in the database
   restaurant_model.mongodb_delete_restaurant(restaurant)
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

var getRestaurantById=(req,res) => {
   console.log(req.params.id);
   var rid=parseInt(req.params.id);
   
   if(!req.params) {
      res.status(400).send({message: "Content can not be empty!"});
      return;
   }

   // Create a Restaurant
   const restaurant = {
      _id:rid,
      r_Name: req.body.r_Name,
      r_Img_Path: req.body.r_Img_Path,
      r_Owner_Id: req.body.r_Owner_Id,
      r_Addresses: req.body.r_Addresses,
      r_Dishes: req.body.r_Dishes
   };

   // Delete Restaurant in the database
   restaurant_model.mongodb_get_restaurant_by_id(restaurant)
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

module.exports={getRestaurant,createRestaurant,updateRestaurant,deleteRestaurant,getRestaurantById,getOwnerRestaurants}