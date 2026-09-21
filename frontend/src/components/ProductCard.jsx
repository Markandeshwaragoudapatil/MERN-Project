function ProductCard({ name, price,id,onSelect }) {
    async function handleViewProduct(){
        onSelect({name,price})
        // try{
        //    const response=await fetch(`http://localhost:3000/products/${id}`,{
        //         method:"GET",
        //         credentials:'include'
        //     })
        //     const data=await response.json();
        // }catch(error){
        //     console.log("Network Error : ",error);    
        // }        
    }

    return (
        <div className="product-card">
            <h3>{name || "Name not available"}</h3>

            <p className="product-price">
                ₹{price ?? "Price not available"}
            </p>

            <button onClick={handleViewProduct}>
                View Product
            </button>
        </div>
    );
}

export default ProductCard;