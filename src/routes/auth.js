const express = require("express");
const authRouter = express.Router();

const {validateSignupData} = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");



authRouter.post("/signup" , async (req,res)=>{
    const user = new User(req.body);
try{
    validateSignupData(req);

    const {firstName,lastName,emailId,password} = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    const user = new User({firstName,lastName,emailId,password:passwordHash});

    await user.save();
    res.send("Data saved successfully");
}
catch(err){
    res.status(400).send("Error :" + err.message);
}
});

authRouter.post("/login", async(req,res)=>{
    try{
        const { emailId,password } = req.body;
    
    const user = await User.findOne({ emailId:emailId });
    if (!user) {
        throw new Error("User does not exists");
    }
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
    
        const token = await user.getJWT();
        res.cookie("token", token);
        res.send("Login Successfull!");
    } else{
        throw new Error("Your password is incorrect");
    }   
    }
    catch(err){
        res.status(400).send("Error :" + err.message);
    }
    });

module.exports = authRouter;