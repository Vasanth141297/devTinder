const express = require("express");
const connectDB = require("./config/database");
const port = 1848;
const app = express();
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const requestRouter = require("./routes/request");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");

app.use(express.json());
app.use(cookieParser());

app.use("/" ,authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);


app.get("/getuser",async (req,res) =>{
    const userCity = req.body.city;

try{
    const users = await User.findOne({city : userCity})
    res.send(users)
}
catch(err){
    res.status(400).send("Error :" + err.message);
}
})

app.delete("/deleteuser/", async (req,res)=>{

    const userId = req.body.userId;

try{
    
    const deluser = await User.findByIdAndDelete(userId);
    res.send("User deleted Successfully");
}
catch(err){

    res.status(400).send("Error :" + err.message);
}
});

app.patch("/updateuser/:userId", async (req,res) => {
    
    const userId = req.params?.userId;
    const data = req.body;
 
try {

    const allowUpdate =["city","skills","age"];
    const isUpdateAllowed = Object.keys(data).every((k)=> allowUpdate.includes(k));

if (!isUpdateAllowed) {
    throw new Error("Update is not allowed"); 
}   
    const user = await User.findByIdAndUpdate({_id:userId},data ,{
    returnDocument : 'after',
    runValidators:true,
    
})
res.send("User updated Successfully"); 
} 
catch(err){
    res.status(400).send("Error :" + err.message);
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