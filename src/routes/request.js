const express = require("express");
const requestRouter = express.Router();

const {userAuth} = require("../middleware/auth");

requestRouter.post("/connectionRequest",userAuth, async(req,res) =>{

    const user = req.user;

    res.send(user.firstName + "Send Connection request");
})

module.exports = requestRouter;