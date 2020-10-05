import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { Plus, Trash } from 'react-bootstrap-icons';

import Table from '../Lib/Table/Components/Table';
import SearchBar from '../Lib/SearchBar/Components/SearchBar';
import PopUpModal from '../Modals/PopUpModal/PopUpModal';
import { CreateNew, ConfirmPopup } from './PopUpBody';
import { setDisplayCheck, setProjectsSelected } from '../Slices/ProjectSlice';
import { NoRowsOverlay, ProjectCellRenderer } from './TableOverlays';
import { filterByName } from './../Utils/FilterSearch';
import { getColumns } from './../Utils/GetColumns';
import LoadingModal from '../Modals/LoadingModal/LoadingModal';
import { setFileDetails } from '../Slices/FilesSlice';
import { getProjectsList, createNew, deleteExisting } from './../Utils/ApiService';
import MessageModal from '../Modals/MessageModal/MessageModal';
import './../css/ProjectLists.scss';

export default function Lists() {

    let customComponents = {
        noRowsOverlay: NoRowsOverlay,
        rowCellRenderer: ProjectCellRenderer
    }

    let type = useSelector(state => state.projectListType.type);
    let currentUser = useSelector(state => state.user.currentUser);
    let selectedProjects = useSelector(state => state.projectPage.projectsSelected);

    let trashButton = useRef(null);

    let dispatch = useDispatch();

    let [columnDefs,setColumnDefs] = useState([]);
    let [rowsData,setRowsData] = useState([]);
    let [originalRowsData,setOriginalRowsData] = useState([]);
    let [popUpProperties,setPopUpProperties] = useState({});
    let [isLoading,setIsLoading] = useState(true);
    let [showMessage, setShowMessage] = useState(false);
    let [msg,setMsg] = useState('');
    let [showPopup,setShowPopup] = useState(false);

    const getSearchText = (text) => {
        let filteredRows = filterByName(originalRowsData,'projectName',text);
        setRowsData(filteredRows);
    }

    const closeMessageModal = () => {
        setShowMessage(false);
    }

    const closePopupModal = () => {
        setShowPopup(false);
    }

    const saveNewProject = (projectName) => {

        let newProjectInfo = {
            projectName,
            email: currentUser.email
        }

        createNew(newProjectInfo,'projects')
            .then(project => {
                let newProject = {
                    projectName: project.data.projectName,
                    lastModified: project.data.lastModified,
                    dateCreated: project.data.dateCreated
                }
                let newRowsData = [...rowsData];
                newRowsData.unshift(newProject);
                setRowsData(newRowsData);
                setShowPopup(false);
            })
            .catch(err => {
                console.log(err);
                setShowMessage(true);
                if(err.response) {
                    setMsg(err.response.data.errMsg);
                }else {
                    setMsg(err.message);
                }          
            })
    }

    const createNewproject = () => {
        setShowPopup(true);
        setPopUpProperties({
            body: <CreateNew
                        saveNew={saveNewProject}
                        type={'projects'}
                        closeModal={() => closePopupModal()}
                  />,
            heading: 'Create new project'
        });
    }

    const deleteSelectedProjects = () => {
        let projects = {
            email: currentUser.email,
            selectedProjects
        }
        deleteExisting(projects,'projects')
            .then(msg => {
                console.log(msg.data.msg);
                let updatedList = [...rowsData];
                for(let i = updatedList.length-1;i >= 0;i--) {
                    for(let j = 0; j < selectedProjects.length;j++) {
                        if(updatedList[i].projectName === selectedProjects[j]) {
                            updatedList.splice(i,1);
                        }
                    }                    
                }
                setRowsData(updatedList);                
                setShowPopup(false);
                dispatch(setProjectsSelected({reset: true}));
            })
            .catch(err => {
                setShowPopup(false);
                setShowMessage(true);
                if(err.response) {
                    setMsg(err.response.data.errMsg);
                }else {
                    setMsg(err.message);
                } 
            })
    }

    const deleteProjectsConfirm = () => {
        if(selectedProjects.length) {
            setShowPopup(true);
            setPopUpProperties({
                body: <ConfirmPopup 
                            approveAction={() => deleteSelectedProjects()}
                            closeModal={() => closePopupModal()}
                            text={'Are you sure you want to delete the selected project(s)?'}
                    />,
                heading: 'Delete project(s)'
            });
        }        
    }    

    useLayoutEffect(() => {
        if(selectedProjects.length) {
            trashButton.current.classList = ['project-action-icons'];
        }else {
            trashButton.current.classList = ['project-action-icons-disabled'];
        }
    },[selectedProjects]);

    useEffect(() => {
        dispatch(setDisplayCheck(false));
        dispatch(setFileDetails({}));
        getProjectsList(type,currentUser)        
            .then(projects => {
                let columns = getColumns(type);
                let rows = projects.data;
                setColumnDefs(columns);                
                setRowsData(rows);
                setOriginalRowsData(rows);
                setIsLoading(false);
            })
            .catch(err => {
                setShowMessage(true);
                setMsg(err.message);
                setIsLoading(false);
                let columns = getColumns(type);
                setColumnDefs(columns);
                setRowsData([]);
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
            <div className={'action-container'}>
                <div className={'action-panel'}>
                    <div className={'action-buttons'}>
                        <Plus 
                            className={'project-action-icons'} 
                            size={30} 
                            onClick={() => {createNewproject()}}
                        />

                        <Trash 
                            ref={trashButton} 
                            className={'project-action-icons-disabled'}
                            size={25}  
                            onClick={() => {deleteProjectsConfirm()}}
                        />
                    </div>             
                </div>   
            </div>
            <div className={'list-panel'}>
                {
                    isLoading ?
                    <LoadingModal />
                    :
                    <div className={'table-container'}>                    
                        <Table
                            columnDefs={columnDefs}
                            rowsData={rowsData}
                            actionRows={true}
                            customComponents={customComponents}
                        />
                    </div>
                }              
            </div>

            {
                showPopup &&<PopUpModal 
                    heading={popUpProperties.heading}
                    body={popUpProperties.body}
                    closeModal={closePopupModal}
                />
            }
            {
                showMessage && <MessageModal 
                    closeMessageModal={() => {closeMessageModal()}}
                    msg={msg}
                />
            }
        </div>
    )
}