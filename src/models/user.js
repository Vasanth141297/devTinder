const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

userSchema.methods.getJWT = async function (params) {
    const user = this;
    
   const token = await jwt.sign({_id:user._id},"vasanth$97");

   return token;
}

userSchema.methods.validatePassword = async function (inputpasswordByUser){
    const user = this;

    const passwordHash = user.password
    const isPasswordValid = await bcrypt.compare(inputpasswordByUser, passwordHash);

return isPasswordValid;
}


module.exports = mongoose.model("User",userSchema);