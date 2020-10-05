import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

let persistConfig = {
    key: 'projectPage',
    storage: storage,
    whiteList: ['displayCheck']
}

export const projectPageSlice = createSlice({
    name: 'projectPage',
    initialState: {
        displayCheck: false,
        openProjectDeatils: {},
        projectsSelected: []
    },
    reducers: {
        setDisplayCheck: function(state,action) {
            state.displayCheck = action.payload;
        },
        setProjectDetails: function(state,action) {
            state.openProjectDeatils = action.payload;
        },
        setProjectsSelected: function(state,action) {
            if(action.payload.reset) {
                state.projectsSelected = [];
                return;
            }
            if(action.payload.selected) {
                state.projectsSelected.push(action.payload.projectName);
            }else {
                let index = state.projectsSelected.indexOf(action.payload.projectName);
                let tempList = [...state.projectsSelected];
                tempList.splice(index,1);
                state.projectsSelected = tempList;
            }
        }
    }
});

export const { setDisplayCheck, setProjectDetails, setProjectsSelected } = projectPageSlice.actions;

export default persistReducer(persistConfig, projectPageSlice.reducer);