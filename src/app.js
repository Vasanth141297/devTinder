const express = require("express");
const port = 8848;
const app = express();

app.get("/fetchUserDetails",(req,res) => {
    res.send({name:"vasanth",age:27,city:"kanchipuram"})
});
app.post("/updateUserDetails",(req,res)=>{
    res.send("User details updated successfully")
});


// app.use("/", (req,res) => {
//     res.send("Welcome to the first server");
// });

// app.use("/result",(req,res) => {
//     res.send("successfully created first node server");
// });

app.listen(port , () =>{
    console.log("The port is listening in ${port}...");
});