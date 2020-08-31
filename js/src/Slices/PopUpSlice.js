import { createSlice } from "@reduxjs/toolkit";

export const showPopUpSlice = createSlice({
    name: 'popUp',
    initialState: {
        showPopUp: false
    },
    reducers: {
        setShowPopUp: (state,action) => {
            state.showPopUp = action.payload
        }
    }
});

export const { setShowPopUp } = showPopUpSlice.actions;

export default showPopUpSlice.reducer;