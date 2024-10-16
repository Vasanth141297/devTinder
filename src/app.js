const express = require("express");
const connectDB = require("./config/database");
const port = 1848;
const app = express();
const User = require("./models/user");

app.use(express.json());


app.post("/signup" , async (req,res)=>{
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

app.delete("/deleteuser", async (req,res)=>{

    const userId = req.body.userId;

try{
    
    const deluser = await User.findByIdAndDelete(userId);
    res.send("User deleted Successfully");
}
catch(err){

    res.status(404).send("Something went wrong");
}
});

app.patch("/updateuser", async (req,res) => {
    
    const userId = req.body.userId;
    const data = req.body;
try {
    
    const user = await User.findByIdAndUpdate({_id:userId},data ,{
        returnDocument : 'before',
        
    });
    res.send("User updated Successfully");
} 
catch (err) {
    res.status(404).send("Something went wrong");
}

})
 

connectDB()
    .then(()=>{
        console.log("Database connected successfully....");
        app.listen(port , () =>{
            console.log("The port is listening in 1848...");
        })
    })
   
    .catch((err)=>{
        console.error("Database is not conneted")
    });