const express = require("express");
const connectDB = require("./config/database");
const port = 1848;
const app = express();
const User = require("./models/user");

app.use(express.json());

app.post("/signup" , async(req,res)=>{
    const user = new User(req.body);

try{
    await user.save();
    res.send("Data saved successfully");
}
catch(err){
    res.status(400).send("Error while saving user data" + err.message);
}

});

app.get("/getuser",async (req,res) =>{
    const userCity = req.body.city;

try{
    const users = await User.findOne({city : userCity})
    res.send(users)
}
catch(err){
    res.status(404).send("Something went wrong");
}
})



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