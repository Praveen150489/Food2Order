const { MongoClient } = require("mongodb")

function mongodb_get_carts(){
    //Mongodb connection 
    //code to insertOne data
    //return success
    console.log("connected to Mongodb and getting carts")
    return new Promise((resolve, reject) => {
        var conn = new MongoClient("mongodb://127.0.0.1:27017/food_to_order")
        console.log("Connected to mongoDB");
        var myDB = conn.db();
        var coll = myDB.collection('carts')
        var carts = coll.find().toArray();
        resolve(carts)
    })
    //return {"id":100,"r_Name":"Aubree"}
}

function mongodb_add_cart(cart){
    //Mongodb connection 
    //code to insertOne data
    //return success
    console.log("connected to Mongodb and creating a cart")
    return new Promise((resolve, reject) => {
        try{
        var conn = new MongoClient("mongodb://127.0.0.1:27017/food_to_order")
        console.log("Connected to mongoDB");
        var myDB = conn.db();
        var coll = myDB.collection('carts')
        coll.insertOne(cart).then(function(result) {
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

function mongodb_update_cart(cart){
    //Mongodb connection 
    //code to insertOne data
    //return success
    console.log("connected to Mongodb and creating a user")
    return new Promise((resolve, reject) => {
        try{
        var conn = new MongoClient("mongodb://127.0.0.1:27017/food_to_order")
        console.log("Connected to mongoDB");
        var myDB = conn.db();
        var coll = myDB.collection('carts')
        const filter = { _id: cart._id};
        coll.replaceOne(filter,cart).then(function(result) {
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

function mongodb_delete_cart(cart){
    //Mongodb connection 
    //code to insertOne data
    //return success
    console.log("connected to Mongodb and creating a restaurant")
    return new Promise((resolve, reject) => {
        try{
        var conn = new MongoClient("mongodb://127.0.0.1:27017/food_to_order")
        console.log("Connected to mongoDB");
        var myDB = conn.db();
        var coll = myDB.collection('carts')
        const filter = { _id: cart._id};
        coll.deleteOne(filter,cart).then(function(result) {
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

function mongodb_get_cart_by_id(cart){
    //Mongodb connection 
    //code to insertOne data
    //return success
    console.log("connected to Mongodb and creating a restaurant")
    return new Promise((resolve, reject) => {
        try{
        var conn = new MongoClient("mongodb://127.0.0.1:27017/food_to_order")
        console.log("Connected to mongoDB");
        var myDB = conn.db();
        var coll = myDB.collection('carts')
        const filter = { _id: cart._id};
        coll.findOne(filter,cart).then(function(result) {
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

module.exports={mongodb_add_cart, mongodb_get_carts, mongodb_update_cart, mongodb_delete_cart, mongodb_get_cart_by_id}
