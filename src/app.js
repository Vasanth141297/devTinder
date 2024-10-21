const express = require("express");
const connectDB = require("./config/database");
const port = 1848;
const app = express();
const User = require("./models/user");
const {validateSignupData} = require("./utils/validation");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {userAuth} = require("./middleware/auth");

app.use(express.json());
app.use(cookieParser());


app.post("/signup" , async (req,res)=>{
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

app.post("/login", async(req,res)=>{
try{
    const { emailId,password } = req.body;

const user = await User.findOne({ emailId:emailId });
if (!user) {
    throw new Error("User does not exists");
}
const isPasswordValid = await bcrypt.compare(password, user.password);
if (isPasswordValid) {

    const token = await jwt.sign({ _id:user._id },"vasanth$97");
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
    
app.get("/getProfile",userAuth,async (req,res) => {
try {
    const user = req.user;
    res.send(user);
   
} catch(err){
        res.status(400).send("Error :" + err.message);
    }
});

app.get("/getuser",async (req,res) =>{
    const userCity = req.body.city;

try{
    const users = await User.findOne({city : userCity})
    res.send(users)
}
catch(err){
    res.status(400).send("Something went wrong");
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

app.patch("/updateuser/:userId", async (req,res) => {
    
    const userId = req.params?.userId;
    const data = req.body;
 
try {

    const allowUpdate =["city","skills","age"];
    const isUpdateAllowed = object.keys(data).every((k)=> allowUpdate.includes(k));

if (!isUpdateAllowed) {
    throw new Error("Update is not allowed"); 
}   
    const user = await User.findByIdAndUpdate({_id:userId},data ,{
    returnDocument : 'after',
    runValidators:true,
    
})
console.log(data);
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