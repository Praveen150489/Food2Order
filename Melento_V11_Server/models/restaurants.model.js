const { MongoClient } = require("mongodb")

function mongodb_get_restaurant(){
    //Mongodb connection 
    //code to insertOne data
    //return success
    console.log("connected to Mongodb and getting a restaurant")
    return new Promise((resolve, reject) => {
        var conn = new MongoClient("mongodb://127.0.0.1:27017/food_to_order")
        console.log("Connected to mongoDB");
        var myDB = conn.db();
        var coll = myDB.collection('restaurants')
        var restaurants = coll.find().toArray();
        resolve(restaurants)
    })
    //return {"id":100,"r_Name":"Aubree"}
}

function mongodb_add_restaurant(restaurant){
    //Mongodb connection 
    //code to insertOne data
    //return success
    console.log("connected to Mongodb and creating a restaurant")
    return new Promise((resolve, reject) => {
        try{
        var conn = new MongoClient("mongodb://127.0.0.1:27017/food_to_order")
        console.log("Connected to mongoDB");
        var myDB = conn.db();
        var coll = myDB.collection('restaurants')
        coll.insertOne(restaurant).then(function(result) {
            console.log("insertOne result: "+JSON.stringify(result));
            resolve(result);
        })
        }catch(err){

        }
        finally{
            // conn.Close();
        }
    })
    //return {"id":100,"r_Name":"Aubree"}
}

function mongodb_update_restaurant(restaurant){
    //Mongodb connection 
    //code to insertOne data
    //return success
    console.log("connected to Mongodb and creating a restaurant")
    return new Promise((resolve, reject) => {
        try{
        var conn = new MongoClient("mongodb://127.0.0.1:27017/food_to_order")
        console.log("Connected to mongoDB");
        var myDB = conn.db();
        var coll = myDB.collection('restaurants')
        const filter = { _id: restaurant._id};
        coll.replaceOne(filter,restaurant).then(function(result) {
            console.log("replaceOne result: "+JSON.stringify(result));
            resolve(result);
        })
        }catch(err){

        }
        finally{
            // conn.Close();
        }
    })
    //return {"id":100,"r_Name":"Aubree"}
}

function mongodb_delete_restaurant(restaurant){
    //Mongodb connection 
    //code to insertOne data
    //return success
    console.log("connected to Mongodb and creating a restaurant")
    return new Promise((resolve, reject) => {
        try{
        var conn = new MongoClient("mongodb://127.0.0.1:27017/food_to_order")
        console.log("Connected to mongoDB");
        var myDB = conn.db();
        var coll = myDB.collection('restaurants')
        const filter = { _id: restaurant._id};
        coll.deleteOne(filter,restaurant).then(function(result) {
            console.log("deleteOne result: "+JSON.stringify(result));
            resolve(result);
        })
        }catch(err){

        }
        finally{
            // conn.Close();
        }
    })
    //return {"id":100,"r_Name":"Aubree"}
}

function mongodb_get_restaurant_by_id(restaurant){
    //Mongodb connection 
    //code to insertOne data
    //return success
    console.log("connected to Mongodb and creating a restaurant")
    return new Promise((resolve, reject) => {
        try{
        var conn = new MongoClient("mongodb://127.0.0.1:27017/food_to_order")
        console.log("Connected to mongoDB");
        var myDB = conn.db();
        var coll = myDB.collection('restaurants')
        const filter = { _id: restaurant._id};
        coll.findOne(filter,restaurant).then(function(result) {
            console.log("findOne result: "+JSON.stringify(result));
            resolve(result);
        })
        }catch(err){

        }
        finally{
            
        }
    })
    //return {"id":100,"r_Name":"Aubree"}
}

function mongodb_get_restaurant_by_owner_id(restaurant){

    console.log("connected to Mongodb and getting restaurants by owner id");
    return new Promise((resolve, reject) => {
        try{
        var conn = new MongoClient("mongodb://127.0.0.1:27017/food_to_order")
        console.log("Connected to mongoDB");
        var myDB = conn.db();
        var coll = myDB.collection('restaurants')
        const filter = {r_Owner_Id : restaurant.r_Owner_Id}
        var restaurants = coll.find(filter,restaurant).toArray();
        resolve(restaurants);
        
        }catch(err){
            reject(err);
        }
        finally{
            
        }
    })
}

module.exports={mongodb_add_restaurant, mongodb_get_restaurant, mongodb_update_restaurant, mongodb_delete_restaurant, mongodb_get_restaurant_by_id,mongodb_get_restaurant_by_owner_id}
