const mongoose=require("mongoose")

// "email":"test@gmail.com",
// "password":"Pass@1234",
// "f_name":"abhishek",
// "l_name":"kasera"

const userSchema=mongoose.Schema({
    // "email":{type:String},
    // "password":{type:String},
    // "firstName":{type:String},
    // "lastName":{type:String},
    // "age":{type:Number},
    // "phoneNo":{type:Number}


    "firstName": {type:String},
    "lastName":{type:String},
    "age":{type:Number},
    "phoneNo":{type:Number},
    "gender": {type:String},
    "id" : {type:String},
    "email":{type:String},
    "password":{type:String}
})


module.exports=mongoose.model("user",userSchema)

