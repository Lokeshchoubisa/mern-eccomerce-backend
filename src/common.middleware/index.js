const jwt=require("jsonwebtoken");

exports.requireSignin=(req,res,next)=>
{
//    res.send(req.headers.authorization);
    if(req.headers.authorization)
    {
    const token=req.headers.authorization.split(" ")[1];
    // res.send(token)
    const user=jwt.verify(token,process.env.JWT_SECRET);
    req.user=user;
    next();
        // jwt.verify(token,process.env.JWT_SECRET,(err,user)=>
        // {
        //     if(err)
        //     {
        //         if(err.name==="TokenExpiredError")
        //         {
        //             console.log("inside expire")
        //             res.clearCookie("token");
        //             // console.log(err.name)
        //         }
        //         // return res.status(400).json({err})
        //     }
        //     else
        //     {
        //         // return res.status(201).json({user})
        //         // console.log(user);
        //         req.user=user;
        //         next();
        //     }
        // })


    }
    else
    {
        return res.status(400).json({msg:"authorization required"});
    }
   

}

exports.userMiddleware=(req,res,next)=>
{
    
    next();
}

exports.adminMiddleware=(req,res,next)=>
{   console.log("admin middleware called")
    if(req.user.role!=="admin")     
    {   console.log(req.user);
        return res.status(400).json({message:"Admin access denied"});
    }
    next();
}