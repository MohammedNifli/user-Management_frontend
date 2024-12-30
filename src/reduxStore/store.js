// store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../slices/authSlice'; // Import the authReducer from authSlice
import adminReducer from "../slices/adminSlice";

const store = configureStore({
    reducer: {
        auth: authReducer, // Assign authReducer to the auth slice
        admin:adminReducer,

    },
 
});

export default store;


