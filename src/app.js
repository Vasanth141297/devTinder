const express = require("express");
const connectDB = require("./config/database");
const port = 1848;
const app = express();
const User = require("./models/user");

app.post("/signup" , async(req,res)=>{
    const user = new User({
    firstName :"Vasanth",
    lastName:"karthikeyan",
    age:"27",
    mailId:"vasanthmech1222@gmail.com"
    })

try{
    await user.save();
res.send("Data saved successfully");
}
catch(err){
    res.status(400).send("Error while saving user data" + err.message);
}

});



connectDB()
    .then(()=>{
        console.log("Database connected successfully....");
        app.listen(port , () =>{
            console.log("The port is listening in ${port}...");
        })
    })
   
    .catch((err)=>{
        console.error("Database is not conneted")
    });