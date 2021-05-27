const express=require("express");
const env=require("dotenv");
const bodyParser=require("body-parser")
const app=express();
const ejs=require("ejs");
const mongoose=require("mongoose");
const path=require("path");


// app.use(express.json());
// userRouter
const authRouter=require("./routes/auth");
const adminRouter=require("./routes/admin/auth");
const categoryRoutes=require("./routes/category");
const productRoutes=require("./routes/product");
const cartRoutes=require("./routes/cart");
const orderRoutes=require("./routes/order");
// const cartRoutes=require("./routes/cart");
const initialDataRoutes=require("./routes/admin/initialData");
const changeOrderStatus=require("./routes/admin/order")
const cors=require("cors")



mongoose.set('useFindAndModify', false);
app.set("view engine","ejs");
env.config();
app.use(express.json());
app.use(cors());
app.use("/api",authRouter);
app.use("/api",adminRouter);
app.use("/api",categoryRoutes);
app.use("/api",productRoutes);
app.use("/api",cartRoutes);
app.use("/api",initialDataRoutes);
app.use("/api",changeOrderStatus);
app.use("/api",orderRoutes);

// app.use(express.json())
app.use("/public",express.static(path.join(__dirname,"uploads")));


////////////////////////////////////////////////////////// database management ///////////////////////////////////////////////////////////

mongoose.connect("mongodb://localhost:27017/eccomerceDB",{useNewUrlParser:true,useUnifiedTopology: true,useCreateIndex:true}).then(()=>{
    console.log("database connected");
});









////////////////////////////////////////////////////////////the end/////////////////////////////////////////////////////////////////////




app.listen(process.env.PORT,function()
{
    console.log("listening at " + process.env.PORT);
});