export const getColumns = (tableType) => {
    if(tableType === 'allProjects') {
        return getAllProjectsColumnDefs();
    }else if(tableType === 'recentActivity') {
        return getRecentsColumnDefs();
    }else if(tableType === 'drafts') {
        return getDraftsColumnDefs();
    }
}

const getAllProjectsColumnDefs = () => {
    return [
        {
            name: 'Project Name',
            field: 'projectName',
            alignment: 'left',
            width: '53%',
            children: []
        },
        {
            name: 'Last Modified',
            field: 'lastModified',
            children: []
        },
        {
            name: 'Date Created',
            field: 'dateCreated',
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
            children: []
        },
        {
            name: 'Last Modified',
            field: 'lastModified',
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
            children: []
        },
        {
            name: 'Date Created',
            field: 'dateCreated',
            children: []
        }    
    ]
}