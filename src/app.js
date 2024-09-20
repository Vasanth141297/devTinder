const express = require("express");

const app = express();

app.use("/", (req,res) => {
    res.send("Welcome to the first server");
});

app.use((req,res) => {
    res.send("successfully first node server");
});

app.listen(8080 , () =>{
    console.log("The port is listening in 8080...");
});