const mongoose = require("mongoose");

const validator = require("validator");

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
        unique:true,
    },
    age:{
        type: Number,
        minLength:18
    },
    city: {
        type: String
    },
    password:{
        type:String,
        required:true,
        },
    // },
    gender:{
        type:String,
        enum:["male","female","others"]
    },
    skills:{
        type:[String]
    }
   
},{timestamps:true});

module.exports = mongoose.model("User",userSchema);