const getAllProjectsColumnDefs = () => {
    return [
        {
            name: 'Project Name',
            field: 'projectName',
            alignment: 'left',
            width: '53%',
            customComponents: {
                rowCellRenderer: 'projectCellRenderer'
            },
            children: []
        },
        {
            name: 'Last Modified',
            field: 'lastModified',
            customComponents: {
                rowCellRenderer: 'projectCellRenderer'
            },
            children: []
        },
        {
            name: 'Date Created',
            field: 'dateCreated',
            customComponents: {
                rowCellRenderer: 'projectCellRenderer'
            },
            children: []
        }    
    ]
}

const getRecentsColumnDefs = () => {
    return [
        {
            name: 'Project Name',
            field: 'projectName',
            alignment: 'left',
            width: '53%',
            customComponents: {
                rowCellRenderer: 'projectCellRenderer'
            },
            children: []
        },
        {
            name: 'Last Modified',
            field: 'lastModified',
            customComponents: {
                rowCellRenderer: 'projectCellRenderer'
            },
            children: []
        }   
    ]
}

const getDraftsColumnDefs = () => {
    return [
        {
            name: 'Project Name',
            field: 'projectName',
            alignment: 'left',
            width: '53%',
            customComponents: {
                rowCellRenderer: 'projectCellRenderer'
            },
            children: []
        },
        {
            name: 'Date Created',
            field: 'dateCreated',
            customComponents: {
                rowCellRenderer: 'projectCellRenderer'
            },
            children: []
        }    
    ]
}

export const getColumns = (tableType) => {
    if(tableType === 'allProjects') {
        return getAllProjectsColumnDefs();
    }else if(tableType === 'recentActivity') {
        return getRecentsColumnDefs();
    }else if(tableType === 'drafts') {
        return getDraftsColumnDefs();
    }
}