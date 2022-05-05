const mongoose=require("mongoose")

// "email":"test@gmail.com",
// "password":"Pass@1234",
// "f_name":"mangesh",
// "l_name":"pandit"

const userSchema=mongoose.Schema({
    "email":{type:String},
    "password":{type:String},
    "f_name":{type:String},
    "l_name":{type:String}
})


module.exports=mongoose.model("user",userSchema)

