import mongoose from 'mongoose';

interface Product {
    productImage: string
    productName: string
    productPrice: string
    productDescription: string
    productCategory: string
    productQuantity: Number
}

const ProductSchema = new mongoose.Schema<Product>({
    productImage: {
        type: String,
    },
    productName: {
        type: String,
        required: true
    },
    productPrice: {
        type: String,
        required: true
    },
    productDescription: {
        type: String,
        required: true
    },
    productCategory: {
        type: String,
    },
    productQuantity: {
        type: Number,
    },
}, { timestamps: true })

const Product = mongoose.model('Product', ProductSchema);
export default Product;