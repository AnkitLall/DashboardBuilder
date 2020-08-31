import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector,useDispatch } from 'react-redux';
import { Plus, Trash } from 'react-bootstrap-icons';

import Table from '../Lib/Table/Components/Table';
import SearchBar from '../Lib/SearchBar/Components/SearchBar';
import PopUpModal from '../Modals/PopUpModal/PopUpModal';
import { 
    CreateNewProject,
    DeleteProjects 
} from './PopUpBody';
import { setShowPopUp } from './../Slices/PopUpSlice';
import { NoRowsOverlay } from './TableOverlays';
import { filterByName } from './../Utils/FilterSearch';
import { getColumns } from './../Utils/GetColumns';
import './../css/ProjectLists.scss';

let rows = [
    {
        projectName: 'Project 1',
        lastModified: '1',
        dateCreated: '02/11/20'
    },
    {
        projectName: 'a 2',
        lastModified: '1',
        dateCreated: '02/11/20'
    }
]

export default function Lists(props) {

    let customComponents = {
        noRowsOverlay: NoRowsOverlay
    }

    let type = useSelector(state => state.projectListType.type);
    let currentUser = useSelector(state => state.user.currentUser);
    let showPopUp = useSelector(state => state.showPopUp.showPopUp);

    let dispatch = useDispatch();

    let [columnDefs,setColumnDefs] = useState([]);
    let [rowsData,setRowsData] = useState([]);
    let [popUpProperties,setPopUpProperties] = useState({});

    const getSearchText = (text) => {
        let filteredRows = filterByName(rows,'projectName',text);
        setRowsData(filteredRows);
    }

    const createNewproject = () => {
        dispatch(setShowPopUp(true));
        setPopUpProperties({
            body: <CreateNewProject />,
            heading: 'Create new project'
        });
    }

    const deleteProjectsConfirm = () => {
        dispatch(setShowPopUp(true));
        setPopUpProperties({
            body: <DeleteProjects />,
            heading: 'Delete project(s)'
        });
    }

    const openProjectPage = (params) => {
        console.log(params);
    }

    useEffect(() => {
        axios.post(`/api/projects/${type}`,{email: currentUser.email})
            .then(projects => {
                let columns = getColumns(type);
                let rows = projects.data;
                setColumnDefs(columns);                
                setRowsData(rows);
            })
            .catch(err => {
                console.log(err);
            })
    },[type]);    

    return(
        <div className={'list-container'}>
            <div className={'search-panel'}>
                <div className={'search-bar-container'}>
                    <SearchBar
                        getSearchText={getSearchText}
                    />
                </div>                
            </div>
            <div className={'action-panel'}>
                <div className={'action-buttons'}>
                    <Plus className={'project-action-icons'} size={30} onClick={() => {createNewproject()}}/>
                    <Trash className={'project-action-icons'} size={25} onClick={() => {deleteProjectsConfirm()}}/>
                </div>                
            </div>
            <div className={'list-panel'}>
                <div className={'table-container'}>                    
                    <Table
                        columnDefs={columnDefs}
                        rowsData={rowsData}
                        actionRows={true}
                        actionRowsHandler={openProjectPage}
                        customComponents={customComponents}
                    />
                </div>                
            </div>

            {
                showPopUp && <PopUpModal 
                    heading={popUpProperties.heading}
                    body={popUpProperties.body}
                />
            }
        </div>
    )
}