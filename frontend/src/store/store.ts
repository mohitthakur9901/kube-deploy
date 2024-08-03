import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import UserSlice from './user/userslice';
import CartSlice from './cart/cartslice'


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user' ,'cart'],
};


const rootReducer = combineReducers({
    user: UserSlice,
    cart: CartSlice
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
})

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
