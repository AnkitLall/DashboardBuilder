import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: {
            name: 'Guest',
            email: ''
        },
        authErrorMsgs: {}
    },
    reducers: {
        setUser: (state,action) => {
            state.currentUser = {
                name: action.payload.name,
                email: action.payload.email
            };
        },
    }
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;