import { createSlice } from '@reduxjs/toolkit';

export const fileConfigSlice = createSlice({
    name: 'config',
    initialState: {
        fileConfig: {},
        originalFileConfig: {},
        change: false
    },
    reducers: {
        setFileConfig: (state,action) => {
            state.fileConfig = {...action.payload};
        },
        setOriginalConfig: (state,action) => {
            state.originalFileConfig = action.payload;
        },
        setChange: (state,action) => {
            state.change = action.payload;
        }
    }
});

export const { setFileConfig, setOriginalConfig, setChange } = fileConfigSlice.actions;

export default fileConfigSlice.reducer;