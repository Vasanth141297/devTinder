const mongoose = require("mongoose");

const connectDB = async () =>{
    await mongoose.connect("mongodb+srv://vasanthmech1222:xqHDKOKPc8rhkrCB@nodeproject.iaz0o.mongodb.net/devTinder");
};

module.exports = connectDB;

