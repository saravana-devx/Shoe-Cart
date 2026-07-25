import { createSlice } from "@reduxjs/toolkit"

const initialState: any = {
    data: []
}

const orderSlice = createSlice({
    name: "orderSlice",
    initialState: initialState,
    reducers: {

        updateOrder: (state, action) => {
            state.data = [...state.data, ...action.payload]
        }

    }
})

export default orderSlice.reducer
export const { updateOrder } = orderSlice.actions