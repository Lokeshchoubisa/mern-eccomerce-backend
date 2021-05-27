const express=require("express");
const { adminMiddleware, requireSignin, userMiddleware } = require("../common.middleware");
const { createProduct, getProductBySlug, getRandomProduct, getProductById } = require("../controller/product");
const router=express.Router()
const Product=require("../models/product")
const multer=require("multer")
const path=require("path");
const shortid = require("shortid");
// const upload=multer({dest:"uploads/"});


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname),"uploads"))
    },
    filename: function (req, file, cb) {
      cb(null,shortid.generate()+"-" +file.originalname)
    }
  })
   
  var upload = multer({ storage: storage })
  

router.post("/product/create",requireSignin,adminMiddleware,upload.array("productPicture"),createProduct);
router.get("/products/:slug",getProductBySlug)
router.get("/product/Random",getRandomProduct)
router.get("/product/productbyid",getProductById)
// router.get("/category/getcategory",userMiddleware,getCategory);
module.exports=router;