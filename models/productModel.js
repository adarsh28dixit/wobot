import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {type: String},
    description: {type: String},
    quantity: {type: Number},
    price: {type: Number},
    
},
{
    timestamps: true,
})



const Product = mongoose.model("Product", productSchema)

export default Product;


