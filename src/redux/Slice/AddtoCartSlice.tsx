import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
    data: []
}

const CartReducer = createSlice({
    name: "CartReducer",
    initialState: initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const exisitng = state.data.find((shoes_Item: any) => {

                return shoes_Item?.id == item.id
            })

            if (exisitng) {
                exisitng.quantity += 1;
            }
            else {
                state.data.push({ ...action.payload, quantity: 1 })

            }




        },
        emptyCart: (state, action) => {
            state.data = action.payload
        }
    },
})


export default CartReducer.reducer
export const { addToCart, emptyCart } = CartReducer.actions