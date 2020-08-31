import { createSlice } from '@reduxjs/toolkit';

export const projectListSlice = createSlice({
    name:'ProjectList',
    initialState: {
        type: 'allProjects'
    },
    reducers: {
        setProjectListType: (state,action) => {
            state.type = action.payload;
        }
    }
});

export const { setProjectListType } = projectListSlice.actions;

export const projectListReducer =  projectListSlice.reducer;