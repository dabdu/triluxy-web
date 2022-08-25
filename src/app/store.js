import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import hotelReducer from "../features/hotel/hotelSlice";
import categoryReducer from "../features/hotelCat/categorySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    hotels: hotelReducer,
    categories: categoryReducer,
  },
});
