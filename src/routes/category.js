const express=require("express");
const { adminMiddleware, requireSignin, userMiddleware } = require("../common.middleware");
const router=express.Router()
const {addCategory, getCategory, updateCategories, deleteCategories}=require("../controller/category")
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
  
router.post("/category/create",requireSignin ,adminMiddleware,upload.single("categoryImage"),addCategory);
router.post("/category/update",upload.single("categoryImage"),updateCategories);
router.post("/category/delete",upload.single("categoryImage"),deleteCategories);
// router.post("/category/update",requireSignin ,adminMiddleware,upload.single("categoryImage"),updateCategories);
router.get("/category/getcategory",userMiddleware,getCategory);

module.exports=router;




