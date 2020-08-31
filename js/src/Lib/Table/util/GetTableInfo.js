import {
    setColumns
} from './SetColumns';

export const getTableHeaderInfo = (columnDefs) => {
    let [tableHeadersList,headersList] = setColumns(columnDefs);
    let headerInfo = {tableHeadersList,headersList};
    return headerInfo;
}