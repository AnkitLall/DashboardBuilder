import { createSlice } from '@reduxjs/toolkit';

export const fileSlice = createSlice({
    name: 'files',
    initialState: {
        fileSelected: [],
        filesList: []
    },
    reducers: {
        setFileDetails: function(state,action) {
            if(action.payload.name) {
                if(action.payload.isMultiple) {
                    state.fileSelected.push(action.payload.name);
                }else {
                    state.fileSelected = [action.payload.name];
                }
            }else {
                state.fileSelected = [];
            }      
        },
        setFiles: (state,action) => {
            let filesList = [];
            action.payload.forEach((file) => {
                let tempFile = {...file};
                if(typeof file.fileConfig === 'string') {
                    file.fileConfig = JSON.parse(file.fileConfig);
                }           
                let fileConfig = {
                    data: {...file.fileConfig.data},
                    table: {...file.fileConfig.table},
                    charts: [...file.fileConfig.charts]
                }
                tempFile.fileConfig = fileConfig;
                filesList.push(tempFile);
            });

            state.filesList = filesList;
        },
        updateFiles: (state,action) => {

        }
    }
});

export const { setFileDetails, setFiles } = fileSlice.actions;

export default fileSlice.reducer;