import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";
import AsyncHandler from "../utils/AsyncHandler";
import Product from "../model/Product.model";
import { uploadOnCloudinary, deleteOnCloudinary } from "../utils/Cloudinary";


// only admin can work on these controllers

const createProduct = AsyncHandler(async (req, res) => {
    
    try {
        const user = req.user?.role == "admin";
        if (user) {
            const { productName, productPrice, productDescription, productCategory, productQuantity } = req.body;
            const productImage = req.file?.path;
            if (!productImage ){
                throw new ApiError(400, "Product image is required");
            }

            const image = await uploadOnCloudinary(productImage);
            if (!image) {
                throw new ApiError(400, "Image not uploaded");
            }
            const product = await Product.create({
                productImage: image.url,
                productName,
                productPrice,
                productDescription,
                productCategory,
                productQuantity
            })
            await product.save();
            return res.json(new ApiResponse(
                200, product, "Product created successfully"
            ))
        } else {
            throw new ApiError(400, "You are not authorized to create product");
        }
    } catch (error) {
        console.log(error);
        throw new ApiError(500, "Something went wrong");
    }
});

const deleteProduct = AsyncHandler(async (req, res) => {
    try {
        const user = req.user?.role === "admin";
        if (user) {
            const { id } = req.params;
            const product = await Product.findByIdAndDelete(id);

            if (!product) {
                throw new ApiError(400, "Product not found");
            }
            await deleteOnCloudinary(product.productImage);
            res.status(200).json(new ApiResponse(200, "Product deleted successfully"));
        } else {
            throw new ApiError(400, "You are not authorized to delete product");
        }
    } catch (error) {
        console.log(error);
        throw new ApiError(500, "Something went wrong");
    }
});

const updateProuct = AsyncHandler(async (req, res) => {
    try {
        const user = req.user?.role === "admin";
        if (user) {
            const { id } = req.params;
            const { productImage, productName, productPrice, productDescription, productCategory, productQuantity } = req.body as Product;
            const product = await Product.findById(id);
            if (!product) {
                throw new ApiError(400, "Product not found");
            }
            if (productImage) {
                const image = await uploadOnCloudinary(productImage);
                if (!image) {
                    throw new ApiError(400, "Image not uploaded");
                }
                product.productImage = image.url;
            }
            if (productName) {
                product.productName = productName;
            }
            if (productPrice) {
                product.productPrice = productPrice;
            }
            if (productDescription) {
                product.productDescription = productDescription;
            }
            if (productCategory) {
                product.productCategory = productCategory;
            }
            if (productQuantity) {
                product.productQuantity = productQuantity;
            }
            await product.save();
            res.status(200).json(new ApiResponse(200, product, "Product updated successfully"));
        } else {
            throw new ApiError(400, "You are not authorized to update product");
        }
    } catch (error) {
        console.log(error);
        throw new ApiError(500, "Something went wrong");
    }
});

const getProduct = AsyncHandler(async (req, res) => {    
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            throw new ApiError(400, "Product not found");
        }
        res.status(200).json(new ApiResponse(200, product, "Product fetched successfully"));
    } catch (error) {
        console.log(error);
        throw new ApiError(500, "Something went wrong");
    }
});

const getAllProduct = AsyncHandler(async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(new ApiResponse(200, products, "Products fetched successfully"));
    } catch (error) {
        console.log(error);
        throw new ApiError(500, "Something went wrong");
    }
});


export {
    createProduct,
    deleteProduct,
    updateProuct,
    getProduct,
    getAllProduct
}