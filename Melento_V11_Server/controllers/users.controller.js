
const user_model = require("../models/users.model.js");
const utility = require('../utility/util.js');
const encryptdecrypt = require('../utility/encryptdecrypt.js');

var getUsers=(req, res) => {
   // Validate request
   // console.log("method called")
   // var result=restaurant_model.mongodb_get_restaurant()
   // res.send(result)

   //var dec_pwd = "";
   user_model.mongodb_get_users().then(
      function(users){
         const objArr = users
         objArr.forEach(o => {
            utility.renamekey(o, '_id', 'id')
         });
         objArr.forEach(o => {
            o.password = decrypt_pwd(o.password)
         });
         res.send(users)
      },
      function(err){
         console.log(err);
      }
   )
   
}

var createUser=(req,res) => {
   //restaurant_model.mongodb_add_restaurant()
   // console.log("method called");
   // var result=restaurant_model.mongodb_add_restaurant()
   // res.send(result)

   let encrypt_p = "";

   if(!req.body.first_name) {
      res.status(400).send({message: "Content can not be empty!"});
      return;
   }

   if(!req.body.password){
      res.status(400).send({message: "Password can not be empty!"});
      return;
   }
   else{
      encrypt_p=encrypt_pwd(req.body.password);
   }

   // Create a User
   const user = {
      _id:req.body.id,
      first_name: req.body.first_name,
      middle_name: req.body.middle_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: encrypt_p,                     //req.body.password,  //encrypt_pwd
      dob: req.body.dob,
      mobile: req.body.mobile,
      address: req.body.address,
      role: req.body.role
   };

   // Save Restaurant in the database
   user_model.mongodb_add_user(user)
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

var updateUser=(req,res) => {
   console.log(req.params.id);
   var rid=parseInt(req.params.id);
   
   let encrypt_p = "";

   if(!req.params) {
      res.status(400).send({message: "Content can not be empty!"});
      return;
   }

   if(!req.body.password){
      res.status(400).send({message: "Password can not be empty!"});
      return;
   }
   else{
      encrypt_p=encrypt_pwd(req.body.password);
   }

   // Create a User
   const user = {
    _id:rid,
    first_name: req.body.first_name,
    middle_name: req.body.middle_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: encrypt_p,                       // req.body.password,
    dob: req.body.dob,
    mobile: req.body.mobile,
    address: req.body.address,
    role: req.body.role
   };

   // Update Restaurant in the database
   user_model.mongodb_update_user(user)
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

var deleteUser=(req,res) => {
   console.log(req.params.id);
   var rid=parseInt(req.params.id);
   
   if(!req.params) {
      res.status(400).send({message: "Content can not be empty!"});
      return;
   }

   // Create a User
   const user = {
    _id:rid,
    first_name: req.body.first_name,
    middle_name: req.body.middle_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    dob: req.body.dob,
    mobile: req.body.mobile,
    address: req.body.address,
    role: req.body.role
   };

   // Delete Restaurant in the database
   user_model.mongodb_delete_user(user)
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

var getUserById=(req,res) => {
   console.log(req.params.id);
   var rid=parseInt(req.params.id);

   if(!req.params) {
      res.status(400).send({message: "Content can not be empty!"});
      return;
   }

   // Create a User
   const user = {
    _id:rid,
    first_name: req.body.first_name,
    middle_name: req.body.middle_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    dob: req.body.dob,
    mobile: req.body.mobile,
    address: req.body.address,
    role: req.body.role
   };

   // Delete Restaurant in the database 
   user_model.mongodb_get_user_by_id(user)
      .then(data => {
         console.log("Controller get by id received: "+JSON.stringify(data))
         let user_temp = data;
         utility.renamekey(user_temp,'_id','id');
         user_temp.password = decrypt_pwd(user_temp.password)
         res.send(data);
      })
      .catch(err => {
         res.status(500).send({
            message: err.message || "some error occured while getting the Restaurant by id from mongoDB"
         });
      });
}


function encrypt_pwd(pwd){
   const arrayBuffer = new ArrayBuffer(16);
   var str2="InitialVector"
   var bufView2 = new Uint16Array(arrayBuffer);
   for (var i=0, strLen=str2.length; i < strLen; i++) {
       bufView2[i] = str2.charCodeAt(i);
       }
   const initVector = arrayBuffer;
   
   //const initVector = crypto.randomBytes(16);
   
   // protected data
   //const message = "This is a secret message";
   
   // secret key generate 32 bytes of random data
   //const Securitykey = crypto.randomBytes(32);
   const arrayBuffer32 = new ArrayBuffer(32);
   var str="Kekkar@1234"
   var bufView = new Uint16Array(arrayBuffer32);
   for (var i=0, strLen=str.length; i < strLen; i++) {
       bufView[i] = str.charCodeAt(i);
       }
   const Securitykey=arrayBuffer32;
   let res=encryptdecrypt.encryptPassword(pwd,Securitykey,initVector)
   return res
 }
 
function decrypt_pwd(pwd){
   const arrayBuffer = new ArrayBuffer(16);
   var str2="InitialVector"
   var bufView2 = new Uint16Array(arrayBuffer);
   for (var i=0, strLen=str2.length; i < strLen; i++) {
       bufView2[i] = str2.charCodeAt(i);
       }
       const initVector = arrayBuffer;
   
   //const initVector = crypto.randomBytes(16);
   
   // protected data
   const message = "This is a secret message";
   
   // secret key generate 32 bytes of random data
   //const Securitykey = crypto.randomBytes(32);
   const arrayBuffer32 = new ArrayBuffer(32);
   var str="Kekkar@1234"
   var bufView = new Uint16Array(arrayBuffer32);
   for (var i=0, strLen=str.length; i < strLen; i++) {
       bufView[i] = str.charCodeAt(i);
       }
   const Securitykey=arrayBuffer32;
   let res=encryptdecrypt.decryptPassword(pwd,Securitykey,initVector)
   return res
}

module.exports={getUsers,createUser,updateUser,deleteUser,getUserById}
