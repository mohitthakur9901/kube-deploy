import  { useEffect, useState } from 'react'
import { addToCart } from '../store/cart/cartslice';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { handleProducts } from '../data/getproduct';
import Cookies from 'js-cookie';
import ProductPage from './ProductPage';
interface Product {
  _id: string;
  productImage: string;
  productName: string;
  productPrice: string;
  productDescription: string;
  productCategory: string;
  productQuantity: number;
}
const Women = () => {
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
    <div>
       <ProductPage handleAddToCart={handleAddToCart} products={products} />
    </div>
  )
}

export default Women