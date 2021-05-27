const express=require("express");
const { placeOrder, cancleOrder, fetchOrders } = require("../controller/order");
// const router = require("./category");
const { adminMiddleware, requireSignin, userMiddleware } = require("../common.middleware");
router=express.Router()


router.post("/order/placeorder",requireSignin,placeOrder)
router.post("/order/cancleorder",requireSignin,cancleOrder)
// router.post("/order/changestatus",requireSignin,cancleOrder)
router.get("/order/fetchorders",requireSignin,fetchOrders)


module.exports=router;