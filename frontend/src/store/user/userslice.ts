import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OrdersArray {
    productId: string;
    quantity: number;
}

interface User {
    _id: string;
    profileImg?: string;
    username: string;
    firstName: string;
    lastName?: string;
    email: string;
    role: string;
    orders: OrdersArray[];
    createdAt: Date;
    updatedAt: Date;
}

const initialState: User = {
    _id: '',
    profileImg: '',
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    orders: [],
    createdAt: new Date(),
    updatedAt: new Date(),
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            return { ...state, ...action.payload };
        },
        clearUser: () => {
            return initialState;
            
        },
        
    },
});

export const { setUser, clearUser  } = userSlice.actions;
export default userSlice.reducer;
