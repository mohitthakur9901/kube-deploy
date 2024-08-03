import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { handleProducts } from './data/getproduct';
import toast from 'react-hot-toast';
import { addToCart } from './store/cart/cartslice';

import ProductPage from './Pages/ProductPage';
import CarouselCard from './Components/Carousel';

interface Product {
  _id: string;
  productImage: string;
  productName: string;
  productPrice: string;
  productDescription: string;
  productCategory: string;
  productQuantity: number;
}

const App: React.FC = () => {
  Cookies.set('access_token', 'your_token_value', { expires: 7 });
  const access_token = Cookies.get('access_token');

  const [products, setProducts] = useState<Product[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await handleProducts(access_token);
      if (data) {
        setProducts(data);
      } else {
        toast.error("Failed to fetch products");
      }
    };

    fetchProducts();
  }, [access_token]);

  const handleAddToCart = (product: Product) => {
    try {
      dispatch(addToCart({
        productId: product._id,
        productImage: product.productImage,
        productName: product.productName,
        productPrice: product.productPrice,
        productQuantity: 1,
        productDescription: product.productDescription,
      }));
      toast.success("Added to cart");
    } catch (error) {
      toast.error("Error adding to cart");
    }
  };

  return (
    <div >
      <CarouselCard/>
      <ProductPage handleAddToCart={handleAddToCart} products={products} />
    </div>
  );
}

export default App;
