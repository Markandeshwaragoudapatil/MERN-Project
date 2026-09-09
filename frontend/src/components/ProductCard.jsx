function ProductCard({name,price}){
    return(
        <div>
            <h1>{name || "Name not available"}</h1>
            <h1>{price || "Price not available"}</h1>
        </div>
    )
}
export default ProductCard