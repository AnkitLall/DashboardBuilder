const handleHierarchy = (tableHeadersList,columnDefs,level,maxLevel,headersList,parentColumn) => {
    if(!tableHeadersList[level]) {
        tableHeadersList[level] = [];
    }

    columnDefs.forEach((column) => { 
        let children = column.children;
        let numChildren = children.length;
        let columnObj = {
            columnName: column.name
        };  

        columnObj['properties'] = setColumnProperties(column,level,numChildren,parentColumn);
        
        tableHeadersList[level].push(columnObj);

        if(children.length) {
            handleHierarchy(tableHeadersList,children,level+1,maxLevel,headersList,column);
        }else {
            let headerInfo = {
                field: column.field
            }
            headerInfo['alignment'] = columnObj.properties.alignment;

            headersList.push(headerInfo);
            let nextLevel = level + 1;
            for(let idx = nextLevel;idx <= maxLevel;idx++) {
                tableHeadersList[idx].push({columnName:'',properties:{colSpan:1}});
            }
        }
    });

    return;
}

const getHeaderDepth = (columnDefs,level,maxLevel) => {
    columnDefs.forEach((column) => {
        if(level > maxLevel) {
            maxLevel = level;
        }

        if(column.children.length) {
            maxLevel = getHeaderDepth(column.children,level+1,maxLevel);
        }
    });

    return maxLevel;
}

const setColumnProperties = (column, currentLevel, numChildren, parentColumn) => {
    let properties = {};

    //Colspan.
    properties['colSpan'] = numChildren;

    //Aligment.
    if(column.alignment) {
        properties['alignment'] = column.alignment;
    }else if(parentColumn.alignment) {
        properties['alignment'] = parentColumn.alignment;
    }else {
        properties['alignment'] = 'center';
    }

    //Width.
    if(currentLevel > 0) {
        properties['width'] = 'auto';        
    }else {
        properties['width'] = column.width;
    }

    return properties;
}

export function setColumns(columnDefs) {
    let tableHeadersList = {};
    let headersList = [];
    let maxLevel = 0;

    maxLevel = getHeaderDepth(columnDefs,0,maxLevel);

    for(let idx = 0;idx <= maxLevel;idx++) {
        tableHeadersList[idx] = [];
    }

    handleHierarchy(tableHeadersList,columnDefs,0,maxLevel,headersList,{}); 
    return [tableHeadersList,headersList];
}