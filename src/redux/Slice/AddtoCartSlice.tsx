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

                item.type == "add" ? exisitng.quantity += 1 : exisitng.quantity -= 1
            }
            else if (!exisitng) {
                state.data.push({ ...action.payload, quantity: 1 })

            }
            state.data = state.data.filter(
                (item: any) => item.quantity > 0
            );



        },
        emptyCart: (state, action) => {
            state.data = action.payload
        }
    },
})


export default CartReducer.reducer
export const { addToCart, emptyCart } = CartReducer.actions