const express = require("express");
const { adminMiddleware, requireSignin } = require("../../common.middleware");
const { changeStatus, fetchAllOrders } = require("../../controller/order");
// const { initialData } = require("../../controller/admin/initialdata");

const router = express.Router();



router.post("/order/changestatus",requireSignin,adminMiddleware,changeStatus);
router.post("/order/fetchallorder",requireSignin,adminMiddleware,fetchAllOrders);




module.exports = router;