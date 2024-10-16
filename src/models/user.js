const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    firstName: {
        type : String,
        lowercase: true,
        required:true,
        trim:true,
        maxLength:25
    },
    lastName: {
        type: String,
        required:true
    },
    emailId: {
        type: String,
        required:true,
        trim:true,
        unique:true
    },
    DOB:{
        type: String
    },
    city: {
        type: String
    },
    password:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        enum:["male","female","others"]
    }
   
},{timestamps:true});

module.exports = mongoose.model("User",userSchema);