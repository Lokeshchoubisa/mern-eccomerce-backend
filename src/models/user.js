const mongoose=require("mongoose");
const bcrypt=require("bcrypt");

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        min:3,
        max:30,
        trim:true   //to remove white space
    },
    lastName:{
        type:String,
        required:true,
        min:3,
        max:30,
        trim:true   //to remove white space
    },
    userName:{
        type:String,
        required:true,
        unique:true,
        index:true,
        lowercase:true,
        trim:true   //to remove white space
    },
    email:{
        type:String,
        required:true,
        unique:true,
        
        lowercase:true,
        trim:true   //to remove white space
    },
    hash_password:{
        type:String,
        required:true,
        trim:true,  //to remove white space
    },
    role:
    {
        type:String,
        enum:["user","admin"],
        default:"admin"
    },
    contact:
    {
        type:String,
    },
    profilePicture:{type:String}

},{timestamps:true});


// this both are propertues which will be stored in sheama but virtual doesnot store in mongoose


// userSchema.virtual("password").set(function(password)
// {
//     this.hash_password=bcrypt.hashSync(password,10);
// })

userSchema.virtual("fullName").get(function()
{
    return this.firstName+" "+this.lastName;
});






userSchema.methods={
    authenticate:async function(password)
    {   
        return await bcrypt.compare(password,this.hash_password);
    }
}




module.exports =mongoose.model("User",userSchema);