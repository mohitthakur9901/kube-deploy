import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

interface Product {
    _id: string;
    productImage: string;
    productName: string;
    productPrice: string;
    productDescription: string;
    productCategory: string;
    productQuantity: number;
    createdAt:Date
    updatedAt:Date
}

const UserOrders = () => {
    const accessToken = Cookies.get('access_token'); // Ensure this matches with the set token key

    const [orders, setOrders] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true); 
    console.log(orders);
    

    useEffect(() => {
        if (!accessToken) {
            toast.error("Authentication token missing.");
            setLoading(false);
            return;
        }

        async function fetchOrders() {
            try {
                const response = await fetch(`/api/v1/get-all-orders`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                console.log(data);
                
                if (data.success) {
                    setOrders(data.data);
                } else {
                    toast.error(data.message || "Failed to fetch orders.");
                }
            } catch (error) {
                toast.error("Failed to fetch orders. Please try again later.");
                console.error("Error fetching orders:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchOrders();
    }, [accessToken]); // Dependency array with accessToken for re-fetch if it changes

    return (
        <div className="p-5">
            <h2 className="text-2xl font-bold mb-5">Your Orders</h2>
            {loading ? (
                <p className="text-gray-600">Loading...</p>
            ) : orders.length === 0 ? (
                <p className="text-gray-600">No orders found.</p>
            ) : (
                <div className="grid gap-4">
                    {orders.map(order => (
                        <Link to={`/product/${order._id}`} key={order._id} className="border p-4 block">
                            <h3 className="text-lg font-bold">{order.productName}</h3>
                            <img src={order.productImage} alt={order.productName} className="w-32 h-32 object-cover" />
                            <p className="text-gray-600">Price: ₹ {order.productPrice}</p>
                            <p className="text-gray-600">Quantity: {order.productQuantity}</p>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}

export default UserOrders;
