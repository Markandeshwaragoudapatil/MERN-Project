const mongoose= require("mongoose");
const Product=require("../models/productModel");
const AppError=require("../utils/AppError")

const getProductById=async (id)=>{
    if(!mongoose.isValidObjectId(id)){
        throw new AppError("Invalid Product ID",400);
    }  
    return Product.findById(id).lean();   
};

const allProducts= async()=>{
    return Product.find().lean();
};

const addItem=async (product)=>{
    return await Product.create(product)
}

const eliminateProduct=async (id)=>{
    if(!mongoose.isValidObjectId(id)){
        throw new AppError("Invalid Product ID",400)
    }
    return Product.findByIdAndDelete(id);
}

const updateProduct=async (id,data)=>{
    if(!mongoose.isValidObjectId(id)){
        throw new AppError("Invalid Product ID",400);
    }

    const updateData={};
    if(data.name!==undefined){
        updateData.name=data.name;
    }
    if(data.price!==undefined){
        updateData.price=data.price;
    }
    return await Product.findByIdAndUpdate(
        id,updateData,{returnDocument:"after"}
    );
};

module.exports={
    getProductById,
    allProducts,
    addItem,
    eliminateProduct,
    updateProduct
}