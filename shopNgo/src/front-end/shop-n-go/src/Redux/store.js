// src/Redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer, { initializeUser } from './features/userSlice';
import menuItemsReducer from './features/menuItemsSlice';
import categoriesReducer from './features/categoriesSlice';
import appReducer from './features/appSlice';
import darkModeReducer from './features/darkModeSlice';
import alertSlice from './features/alertSlice';


export const store = configureStore({
    reducer: {
        user: userReducer,
        menuItems: menuItemsReducer,
        categories: categoriesReducer,
        app: appReducer,
        darkMode: darkModeReducer,
        alert: alertSlice,
    },
    devTools: process.env.NODE_ENV !== 'production',
});

store.dispatch(initializeUser());

export default store;
