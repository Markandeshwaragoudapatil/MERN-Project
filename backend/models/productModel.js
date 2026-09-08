const mongoose=require("mongoose");
const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        minlength:2,
        maxlength:50
    },
    price:{
        type:Number,
        required:true,
        min:1,
        max:10000000
    },
    status:{
        type:String,
        enum:["available","out of stock"],
        default:"available"
    }
});
const Product=mongoose.model("Product",productSchema);
module.exports=Product