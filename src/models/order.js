const mongoose=require("mongoose");
const User=require("./user")
const Product=require("./product")

const orderSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    orders:[
        {
            productId:{type:mongoose.Schema.Types.ObjectId,ref:"Product",required:true},
            status:{type:String,default:"pending"},
            deliveryAddress:{type:String,required:true},
            price:{type:Number,required:true},
            paymentMode:{type:String,required:true,default:"COD"}
            
        }
    ]
    
},{timestamps:true});

module.exports=mongoose.model("Order",orderSchema);