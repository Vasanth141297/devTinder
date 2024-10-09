const adminAuth = ("/admin",(req,res,next)=>{
    const token = "ab56hnjk";
    const isValidAuth = token === "ab56hnjk";
    if(isValidAuth){
        res.send("send the user data");
    } else{
        next();
    }

})