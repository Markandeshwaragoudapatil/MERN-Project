const {
    getProductById,
    allProducts,
    addItem,
    eliminateProduct,
    updateProduct
}=require("../services/productService")

const getProduct = async(req, res) => {

    const product = await getProductById(req.params.id);
    if(!product){
        return res.status(404).json(
            {message:"Product not found"}
        )
    }
    res.status(200).json({
        message: "Product Found",
        product:product
    });
};

const getAllProducts=async(req,res)=>{
    const products=await allProducts();
    if(products.length===0){
        return res.status(200).json([]);
    }
    res.send(products)
}

const addProduct=async (req,res)=>{
    
    if(!req.body){
        return res.status(400).json({
            message:"Enter the details"
        })
    }
    
    const {name,price,status}=req.body;

    const newProduct={
        name:name,
        price:price,
        status:status
    };
    const result=await addItem(newProduct)
    res.status(201).json({
        message:"Product added",
        product:result
    })
};

const deleteProduct=async (req,res)=>{
    const id=req.params.id
    const result=await eliminateProduct(id);

    if(!result){
        return res.status(404).json(
            {message:"Product Not found"}
        );
    }
    res.status(200).json({
        message:"Deleted product",
        product:result
    })

}

const modifyProduct=async (req,res)=>{
    const id=req.params.id;
    const result=await updateProduct(id,req.body)

    if(!result){
        return res.status(404).json({
            message:"Not found"
        });
    }
    res.status(200).json({
        message:"Modified",
        product:result
    })

};

module.exports = {
    getProduct,
    getAllProducts,
    addProduct,
    deleteProduct,
    modifyProduct
};