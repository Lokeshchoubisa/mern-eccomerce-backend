const mongoose=require("mongoose");
// const User=require("./user");
// const Category=require("./category");
const productSchema=new mongoose.Schema({

    name:{
        type:String,
        required:true,
        trim:true
    },
    slug:{
        type:String,
        required:true,
        
    },
    price:{
        type:Number,
        required:true
    },
    description:
    {
        type:String,
        required:true,
        max:5000,
        trim:true
    },
    offer:{
        type:Number
    },
    productPicture:[{img:{
        type:String
    }}],
    reviews:[
        {
            userId:{type:mongoose.Schema.Types.ObjectId,
                ref:"User"},
            review:String
        }
    ],
    category:{
        type:mongoose.Schema.Types.ObjectId,ref:"Category",required:true
    }
    ,
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,ref:"User",required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    updateAt:Date
},{timestamps:true});


module.exports=mongoose.model("Product",productSchema);