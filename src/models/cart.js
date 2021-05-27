const mongoose=require("mongoose");
const User=require("../models/user")
const Product=require("../models/product")


const cartSchema=new mongoose.Schema({

    user:{type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true},
    cartItems:
        [
            {
            productId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Product",
                required:true
            },
            quantity:{
                type:Number,
                default:1,
                required:true
            },
            price:{
                type:Number,
                required:true
            }
        }

        ]
    
    
},{timestamps:true});


module.exports=mongoose.model("Cart",cartSchema);