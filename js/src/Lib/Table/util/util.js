export const getCellInfo = (rowData,headerInfo,rowsData,rowIndex,cellIndex) => {
    let cellInfo = {
        parent: rowData,
        headerInfo: headerInfo,
        rowsList: rowsData,
        cellIndex: cellIndex,
        rowIndex: rowIndex 
    }

    return cellInfo;
}