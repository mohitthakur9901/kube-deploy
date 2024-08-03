import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
    productId: string;
    productImage: string;
    productName: string;
    productPrice: string;
    productDescription: string;
    productQuantity: number;
}

interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const itemIndex = state.items.findIndex(item => item.productId === action.payload.productId);
            if (itemIndex >= 0) {
                // Update the quantity if item already exists
                state.items[itemIndex].productQuantity += action.payload.productQuantity;
            } else {
                // Add new item if it doesn't exist
                state.items.push(action.payload);
            }
        },
        updateQuantity: (state, action: PayloadAction<{ productId: string, quantity: number }>) => {
            const { productId, quantity } = action.payload;
            const itemIndex = state.items.findIndex(item => item.productId === productId);
            if (itemIndex >= 0) {
                state.items[itemIndex].productQuantity = quantity;
            }
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            // Remove item by productId
            state.items = state.items.filter(item => item.productId !== action.payload);
        },
        clearCart: (state) => {
            state.items = [];
        }
    }
});

export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
