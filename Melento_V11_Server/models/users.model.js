const { MongoClient } = require("mongodb")

function mongodb_get_users(){
    //Mongodb connection 
    //code to insertOne data
    //return success
    console.log("connected to Mongodb and getting a users")
    return new Promise((resolve, reject) => {
        var conn = new MongoClient("mongodb://127.0.0.1:27017/food_to_order")
        console.log("Connected to mongoDB");
        var myDB = conn.db();
        var coll = myDB.collection('users')
        var users = coll.find().toArray();
        resolve(users)
    })
    //return {"id":100,"r_Name":"Aubree"}
}

function mongodb_add_user(user){
    //Mongodb connection 
    //code to insertOne data
    //return success
    console.log("connected to Mongodb and creating a user")
    return new Promise((resolve, reject) => {
        try{
        var conn = new MongoClient("mongodb://127.0.0.1:27017/food_to_order")
        console.log("Connected to mongoDB");
        var myDB = conn.db();
        var coll = myDB.collection('users')
        coll.insertOne(user).then(function(result) {
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

function mongodb_update_user(user){
    //Mongodb connection 
    //code to insertOne data
    //return success
    console.log("connected to Mongodb and creating a user")
    return new Promise((resolve, reject) => {
        try{
        var conn = new MongoClient("mongodb://127.0.0.1:27017/food_to_order")
        console.log("Connected to mongoDB");
        var myDB = conn.db();
        var coll = myDB.collection('users')
        const filter = { _id: user._id};
        coll.replaceOne(filter,user).then(function(result) {
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

function mongodb_delete_user(user){
    //Mongodb connection 
    //code to insertOne data
    //return success
    console.log("connected to Mongodb and creating a restaurant")
    return new Promise((resolve, reject) => {
        try{
        var conn = new MongoClient("mongodb://127.0.0.1:27017/food_to_order")
        console.log("Connected to mongoDB");
        var myDB = conn.db();
        var coll = myDB.collection('users')
        const filter = { _id: user._id};
        coll.deleteOne(filter,user).then(function(result) {
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

function mongodb_get_user_by_id(user){
    //Mongodb connection 
    //code to insertOne data
    //return success
    console.log("connected to Mongodb and creating a restaurant")
    return new Promise((resolve, reject) => {
        try{
        var conn = new MongoClient("mongodb://127.0.0.1:27017/food_to_order")
        console.log("Connected to mongoDB");
        var myDB = conn.db();
        var coll = myDB.collection('users')
        const filter = { _id: user._id};
        coll.findOne(filter,user).then(function(result) {
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

module.exports={mongodb_add_user, mongodb_get_users, mongodb_update_user, mongodb_delete_user, mongodb_get_user_by_id}
