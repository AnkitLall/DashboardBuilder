import Papa from 'papaparse';

import { setFileConfig } from '../Slices/FileConfigSlice';

export const csvParser = (file,fileConfig,dispatch) => {
    let data = [];
    let columns = [];
    Papa.parse(file,{
        download: true,
        header: true,
        dynamicTyping: true,
        step: function(row) {    
            if(!columns.length) {
                columns = row.meta.fields;
            }
            data.push(row.data);
        },
        complete: function() {
            console.log('Completed');
            data.pop();
            fileConfig.data.fileName = file.name;
            fileConfig.table.tableValues = data;
            fileConfig.table.columns = columns;
            dispatch(setFileConfig(fileConfig));
        }
    });
}