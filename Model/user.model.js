const mongoose=require("mongoose")

const UserSchema=mongoose.Schema({
    name:String,
    age:Number,
    phone:Number,
    pass:String,
    location:String
})

const UserModel=mongoose.model("user",UserSchema)
module.exports={UserModel}