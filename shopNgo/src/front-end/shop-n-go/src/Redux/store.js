// src/Redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import menuItemsReducer from './features/menuItemsSlice';
import categoriesReducer from './features/categoriesSlice';
import appReducer from './features/appSlice';
import darkModeReducer from './features/darkModeSlice';


export const store = configureStore({
    reducer: {
        user: userReducer,
        menuItems: menuItemsReducer,
        categories: categoriesReducer,
        app: appReducer,
        darkMode: darkModeReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;
