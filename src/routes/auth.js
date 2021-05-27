const express = require("express");
const router = express.Router();
const User = require("../models/user")
const {signup, signin, signout}=require("../controller/auth");
// const {check}=require("express-validator");
// const {requireSignin}
const { validateRequest,validateSigninRequest,validateSignupRequest, isRequestValidated } = require("../validator/auth");
const  {requireSignin}  = require("../common.middleware/index")


router.post("/signin",validateSigninRequest,isRequestValidated , signin);


router.post("/signup",validateSignupRequest,isRequestValidated, signup);
router.post("/signout",requireSignin, signout);

router.post("/profile",requireSignin,(req,res)=>
{
    res.send(
        {
            value:"profile"
        }
    )
});

module.exports = router;