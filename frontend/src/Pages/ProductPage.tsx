import React from "react";
import Card from "../Components/Card";

interface Product {
  _id: string;
  productImage: string;
  productName: string;
  productPrice: string;
  productDescription: string;
  productCategory: string;
  productQuantity: number;
}

interface ProductPageProps {
  products: Product[];
  handleAddToCart: (product: Product) => void;
}

const ProductPage: React.FC<ProductPageProps> = ({ products, handleAddToCart }) => {
  return (
    <div className="flex flex-wrap justify-center">
      {products.map((product) => (
        <Card
          key={product._id}
          product={product}
          addToCart={() => handleAddToCart(product)}
        />
      ))}
    </div>
  );
};

export default ProductPage;
