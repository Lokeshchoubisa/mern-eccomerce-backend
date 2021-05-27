const User=require("../../models/user");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt")
const shortid=require("shortid")

exports.signup= (req, res) => {
    console.log(req.body);

    
    const {
        firstName,
        lastName,
        email,
        password } = req.body;
    
    if(email==="" || firstName==="" || password==="")
        {
            return res.status(400).json("data not entered properly");
        }


    User.findOne({ email: req.body.email }).exec(async (err, user) => {
        if (user) {
            return res.status(400).json({
                message: "Email alerady register!"
            });
        }
        else {

            const {
                firstName,
                lastName,
                email,
                password } = req.body;
            
            const hash_password= await bcrypt.hash(password,10);
            console.log(hash_password);

            // console.log(req.body);
            const _user = new User({
                firstName:firstName,
                lastName,
                email,
                role:"admin",
                userName: shortid.generate(),
                hash_password
                
            });
            // _user.password=hash_password;
            console.log(_user);
         
            _user.save((err, data) => {
                if (err) {
                    // console.log(err)
                    return res.status(400).json({
                        message: "something wrong "
                    });
                }
                if (data) {
                    return res.status(201).json({
                        user:data
                    })
                }
            });
        }
    });
}



exports.signin=(req,res)=>
{   console.log(req.body)
    User.findOne({email:req.body.email}).exec((err,user)=>
    {
        if(err)
        {
             return res.status(400).json({err});
        }
        if(user)
        {
            if(user.authenticate(req.body.password) && user.role==="admin")
            {   const{firstName,lastName,_id,email,role,fullName}=user;
                const token=jwt.sign({_id:user._id, role:user.role},process.env.JWT_SECRET,{expiresIn:"1d"});
                res.cookie("token",token,{ expiresIn :'1h'});
                res.status(200).json({
                    token,
                    users:{
                        firstName,lastName,_id,email,role,fullName
                    }
                });
            }
            else
            {
                res.status(400).json(
                    {
                        message:"password wrong"
                    }
                );
            }
        }else
        {
            return res.status(400).json({message:"something is wrong"});
        }
    })
}


exports.signout=(req,res)=>
{
    res.clearCookie("token");
    return  res.status(200).json({
        message:"signout success...!"
    });
}