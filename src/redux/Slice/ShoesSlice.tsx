import { dummyShoes } from "@/constants/dummyData";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: dummyShoes
}

const shoesSlice = createSlice({
    name: "shoesSlice",
    initialState: initialState,
    reducers: {
        add_Shoes: (state, action) => {
            state.data.unshift(action.payload);
        },
        update_Shoes: (state, action) => {
            state.data = action.payload

        },


    }

})

export default shoesSlice.reducer
export const { add_Shoes, update_Shoes } = shoesSlice.actions