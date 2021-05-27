const {check,validationResult}=require("express-validator");



exports.validateSignupRequest =[
    check("firstName").notEmpty().withMessage("first name is required"),
    check("lastName").notEmpty().withMessage("last name is required"),
    check("email").isEmail().withMessage("Email is required"),
    check("password").isLength({min:6}).withMessage("password is required with 6 character")
];


exports.validateSigninRequest =[
       
        check("email").isEmail().withMessage("Email is required"),
        check("password").isLength({min:6}).withMessage("password is required with 6 character")];
    

exports.isRequestValidated=(req,res,next)=>
{
    const errors=validationResult(req);
    if(errors.array().length>0)
    {
        return res.status(400).json({error:errors.array()[0].msg})
    }
    else
    {
        next();
    }
    
}