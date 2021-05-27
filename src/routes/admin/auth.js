const express = require("express");
const router = express.Router();
const User = require("../../models/user")
const  {requireSignin}=require("../../common.middleware/index");
const {signup, signin, signout}=require("../../controller/admin/auth");
const { validateSignupRequest,validateSigninRequest,isRequestValidated } = require("../../validator/auth");



router.post("/admin/signin",validateSigninRequest,isRequestValidated ,signin);


router.post("/admin/signup",validateSignupRequest,isRequestValidated,signup);
router.post("/admin/signout",requireSignin,signout);


module.exports = router;