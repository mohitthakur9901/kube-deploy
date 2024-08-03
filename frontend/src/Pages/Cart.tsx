import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { updateQuantity, removeFromCart, clearCart } from '../store/cart/cartslice';
import Button from '../Components/Button';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Cart = () => {
  const { items } = useSelector((state: RootState) => state.cart);
  const navigate = useNavigate();
  const access_token = Cookies.get('access_token');

  const dispatch: AppDispatch = useDispatch();

  const handleIncreaseQuantity = (productId: string, quantity: number) => {
    dispatch(updateQuantity({ productId, quantity: quantity + 1 }));
  };

  const handleDecreaseQuantity = (productId: string, quantity: number) => {
    if (quantity > 1) {
      dispatch(updateQuantity({ productId, quantity: quantity - 1 }));
    }
  };

  const handleRemove = (productId: string) => {
    dispatch(removeFromCart(productId));
  };

  // Calculate total price
  const calculateTotalPrice = () => {
    return items.reduce((total, item) => total + (parseFloat(item.productPrice) * item.productQuantity), 0);
  };

  const handleCheckout = async () => {
    try {
      const order = items.map(item => ({ productId: item.productId, quantity: item.productQuantity }));
      console.log(order);
      
      const response = await fetch("/api/v1/add-to-orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${access_token}`
        },
        body: JSON.stringify(order) // Send the entire order array
      });

      console.log(response);
      

      if (!response.ok) {
        throw new Error('Failed to place order');
      }

      const result = await response.json();
      if (result.success) {
        toast.success("Order placed successfully");
        dispatch(clearCart()); // Assuming you want to clear the cart after successful order
        navigate("/"); // Redirect to home or another page
      } else {
        toast.error(result.message || "Something went wrong");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-5">Your Cart</h2>
      {items.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="grid gap-4">
          {items.map(item => (
            <div key={item.productId} className="flex items-center justify-between p-3 border-b border-gray-200">
              <div className="flex items-center">
                <img src={item.productImage} alt={item.productName} className="h-16 w-16 object-cover mr-4" />
                <div>
                  <h3 className="font-bold">{item.productName}</h3>
                  <p className="text-gray-600">₹ {item.productPrice}</p>
                  <div className="flex items-center">
                    <Button type="button" onClick={() => handleDecreaseQuantity(item.productId, item.productQuantity)} className="mr-2">-</Button>
                    <span className="mx-2">{item.productQuantity}</span>
                    <Button type="button" onClick={() => handleIncreaseQuantity(item.productId, item.productQuantity)} className="ml-2">+</Button>
                  </div>
                </div>
              </div>
              <Button type="button" onClick={() => handleRemove(item.productId)} className="ml-4">
                Remove
              </Button>
            </div>
          ))}
          <div className="mt-4 p-4 border-t border-gray-300">
            <h3 className="text-lg font-bold">Total Price: ₹ {calculateTotalPrice().toFixed(2)}</h3>
            <Button type="button" className="mt-2" onClick={handleCheckout}>Checkout</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
