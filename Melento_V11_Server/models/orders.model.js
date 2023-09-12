const { MongoClient } = require("mongodb")

function mongodb_get_orders(){
    //Mongodb connection 
    //code to insertOne data
    //return success
    console.log("connected to Mongodb and getting carts")
    return new Promise((resolve, reject) => {
        var conn = new MongoClient("mongodb://127.0.0.1:27017/food_to_order")
        console.log("Connected to mongoDB");
        var myDB = conn.db();
        var coll = myDB.collection('orders')
        var orders = coll.find().toArray();
        resolve(orders)
    })
    //return {"id":100,"r_Name":"Aubree"}
}

function mongodb_add_order(order){
    //Mongodb connection 
    //code to insertOne data
    //return success
    console.log("connected to Mongodb and creating a cart")
    return new Promise((resolve, reject) => {
        try{
        var conn = new MongoClient("mongodb://127.0.0.1:27017/food_to_order")
        console.log("Connected to mongoDB");
        var myDB = conn.db();
        var coll = myDB.collection('orders')
        coll.insertOne(order).then(function(result) {
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

function mongodb_update_order(order){
    //Mongodb connection 
    //code to insertOne data
    //return success
    console.log("connected to Mongodb and updating order")
    return new Promise((resolve, reject) => {
        try{
        var conn = new MongoClient("mongodb://127.0.0.1:27017/food_to_order")
        console.log("Connected to mongoDB");
        var myDB = conn.db();
        var coll = myDB.collection('orders')
        const filter = { _id: order._id};
        coll.replaceOne(filter,order).then(function(result) {
            console.log("replaceOne result: "+JSON.stringify(result));
            resolve(result);
        })
        }catch(err){
            reject(err);
        }
        finally{
            // conn.Close();
        }
    })
    //return {"id":100,"r_Name":"Aubree"}
}

function mongodb_delete_order(order){
    //Mongodb connection 
    //code to insertOne data
    //return success
    console.log("connected to Mongodb and creating a restaurant")
    return new Promise((resolve, reject) => {
        try{
        var conn = new MongoClient("mongodb://127.0.0.1:27017/food_to_order")
        console.log("Connected to mongoDB");
        var myDB = conn.db();
        var coll = myDB.collection('orders')
        const filter = { _id: order._id};
        coll.deleteOne(filter,order).then(function(result) {
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

function mongodb_get_order_by_id(order){
    //Mongodb connection 
    //code to insertOne data
    //return success
    console.log("connected to Mongodb and creating a restaurant")
    return new Promise((resolve, reject) => {
        try{
        var conn = new MongoClient("mongodb://127.0.0.1:27017/food_to_order")
        console.log("Connected to mongoDB");
        var myDB = conn.db();
        var coll = myDB.collection('orders')
        const filter = { _id: order._id};
        coll.findOne(filter,order).then(function(result) {
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

module.exports={mongodb_add_order, mongodb_get_orders, mongodb_update_order, mongodb_delete_order, mongodb_get_order_by_id}
