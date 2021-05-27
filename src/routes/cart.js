const express=require("express");
const { adminMiddleware, requireSignin, userMiddleware } = require("../common.middleware");
const { addItemToCart, showCart, deleteCart } = require("../controller/cart");
const router=express.Router()
// const {addCategory, getCategory}=require("../controller/category")

router.post("/user/cart/addtocart",requireSignin ,userMiddleware,addItemToCart);
router.get("/user/cart/",requireSignin ,userMiddleware,showCart);
router.post("/user/cart/delete",requireSignin ,userMiddleware,deleteCart);
// router.get("/category/getcategory",userMiddleware,getCategory);

module.exports=router;




