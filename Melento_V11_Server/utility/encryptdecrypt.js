// crypto module
const crypto = require("crypto");

const algorithm = "aes-256-cbc"; 

// generate 16 bytes of random data
//const initVector = crypto.randomBytes(16);

// protected data
//const message = "This is a secret message";

// secret key generate 32 bytes of random data
//const Securitykey = crypto.randomBytes(32);

function encryptPassword(p,Securitykey,initVector){
// const Securitykey = crypto.randomBytes(32);

// the cipher function
const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);

// encrypt the message
// input encoding
// output encoding
let encryptedData = cipher.update(p, "utf-8", "hex");

encryptedData += cipher.final("hex");

console.log("Encrypted message: " + encryptedData);
return encryptedData;
}

/////////////////////////////////////////////
// the decipher function
function decryptPassword(pwd,Securitykey,initVector){
const decipher = crypto.createDecipheriv(algorithm, Buffer.from(Securitykey), initVector);

let decryptedData = decipher.update(pwd, "hex", "utf-8");

decryptedData += decipher.final("utf8");

console.log("Decrypted message: " + decryptedData);
return decryptedData;
}


module.exports = {encryptPassword,decryptPassword}