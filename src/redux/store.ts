import { configureStore } from "@reduxjs/toolkit";
import AddtoCartSlice from "./Slice/AddtoCartSlice";
import ShoesSlice from "./Slice/ShoesSlice";
import ordersSlice from "./Slice/ordersSlice";

export const store = configureStore({
    reducer: {
        shoes: ShoesSlice,
        cart: AddtoCartSlice,
        order: ordersSlice
    }
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;