import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FilePlus, Trash } from 'react-bootstrap-icons';

import { 
    CreateNew,
    ConfirmPopup
} from './../PopUpBody';
import PopUpModal from '../../Modals/PopUpModal/PopUpModal';
import SearchBar from '../../Lib/SearchBar/Components/SearchBar';
import { filterByName } from './../../Utils/FilterSearch';
import { createNew, getFilesList, deleteExisting } from './../../Utils/ApiService';
import { setFileDetails, setFiles } from '../../Slices/FilesSlice';
import LoadingModal from '../../Modals/LoadingModal/LoadingModal';
import FilesList from './FilesList';
import MessageModal from '../../Modals/MessageModal/MessageModal';
import '../../css/FileExplorer.scss'

export default function FileExplorer(props) {

    let [typeSelected, setTypeSelected] = useState('files');
    let [originalFilesList,setOriginalFilesList] = useState([]);
    let [popUpProperties,setPopUpProperties] = useState({});
    let [isLoading,setIsLoading] = useState(true);
    let [showMessage, setShowMessage] = useState(false);
    let [msg,setMsg] = useState('');
    let [showPopup,setShowPopup] = useState(false);
    let [searchValue,setSearchValue] = useState('');

    let fileSelected = useSelector(state => state.files.fileSelected);
    let filesList = useSelector(state => state.files.filesList);
    let currentUser = useSelector(state => state.user.currentUser);
    let fileConfig = useSelector(state => state.config.fileConfig);

    let trashButton = useRef(null);

    let dispatch = useDispatch();

    const getClassNames = (type) => {
        if(typeSelected === type) {
            return 'view-selectors-selected';
        }

        return 'view-selectors';
    }

    const closeMessageModal = () => {
        setShowMessage(false);
    }

    const closePopupModal = () => {
        setShowPopup(false);
    }

    const saveNewFile = (fileName) => {
        let newFileInfo = {
            fileName,
            projectName: props.projectDetails.data.projectName,
            email: currentUser.email,
            fileConfig: JSON.stringify({
                data: {},
                table: {},
                charts: []
            })
        }

        createNew(newFileInfo,'files')
            .then(file => {
                let newFile = {
                    fileName: file.data.fileName,
                    projectName: file.data.projectName,
                    fileConfig: file.data.fileConfig
                }
                let newFilesList = [...filesList];
                newFilesList.unshift(newFile);
                dispatch(setFiles(newFilesList));
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

    const createFile = () => {
        if(fileConfig.change) {
            setShowMessage(true);
            setMsg('You have unsaved configuration!!');
            return;
        }
        setShowPopup(true);
        setPopUpProperties({
            body: <CreateNew
                        saveNew={saveNewFile}
                        type={'files'}
                        closeModal={() => closePopupModal()}
                  />,
            heading: 'Create new file'
        });
    }

    const deleteSelectedFiles = () => {
        let filesInfo = {
            fileSelected,
            projectName: props.projectDetails.data.projectName,
            email: currentUser.email
        }
        deleteExisting(filesInfo,'files')
            .then(msg => {
                let updatedList = [...filesList];
                fileSelected.forEach((file) => {
                    for(let i = updatedList.length-1;i >= 0;i--) {
                        if(updatedList[i].fileName === file) {
                            updatedList.splice(i,1);
                        }
                    }
                });
                dispatch(setFiles(updatedList));

                if(updatedList.length) {
                    dispatch(setFileDetails({name:updatedList[0].fileName,isMultiple:false}));
                }else {
                    dispatch(setFileDetails({}));
                }                
                setShowPopup(false);
            })
            .catch(err => {
                setShowMessage(true);
                setShowPopup(false);
                if(err.response) {
                    setMsg(err.response.data.errMsg);
                }else {
                    setMsg(err.message);
                } 
            })
    }

    const deleteFileConfirm = () => {
        if(fileConfig.change) {
            setShowMessage(true);
            setMsg('You have unsaved configuration!!');
            return;
        }
        if(fileSelected.length) {
            setShowPopup(true);
            setPopUpProperties({
                body: <ConfirmPopup
                            approveAction={() => {deleteSelectedFiles()}}
                            closeModal={() => closePopupModal()}
                            type={'files'}
                            text={'Are you sure you want to delete the selected file(s)?'}
                    />,
                heading: 'Delete file(s)'
            });
        }
    }

    const getSearchText = (name) => {
        if(fileConfig.change) {
            setShowMessage(true);
            setMsg('You have unsaved configuration!!');
            setSearchValue('');
            return;
        }
        let filteredList = filterByName(originalFilesList,'fileName',name);
        dispatch(setFiles(filteredList));
    }    

    useLayoutEffect(() => {
        if(fileSelected.length) {
            trashButton.current.classList = ['file-action'];
        }else {
            trashButton.current.classList = ['file-action-disabled'];
        }
    },[fileSelected]);

    useEffect(() => {
        getFilesList(props.projectDetails.data.projectName)
            .then(filesList => {
                dispatch(setFiles(filesList.data));
                setOriginalFilesList(filesList.data);
                setIsLoading(false);
            })
            .catch(err => {
                console.log(err);
                setShowMessage(true);
                setMsg(err.message);
                dispatch(setFiles([]));
                setIsLoading(false);
            })
    },[props.projectDetails.data.projectName]);

    const changeType = (type) => {        
        if(fileConfig.change) {
            setShowMessage(true);
            setMsg('You have unsaved configuration!!');
            return;
        }

        setTypeSelected(type);
    }

    return(
        <div className={'file-explorer-container'}>
            <div className={'view-selector-section'}>

                <div className={getClassNames('files')} onClick={() => changeType('files')}>
                    Files
                </div>
                <div className={getClassNames('dashboards')} onClick={() => changeType('dashboards')}>
                    Dashboards
                </div>
            </div>
            <div className={'search-bar-section'}>
                <div className={'search-bar'}>
                    <SearchBar
                        value={searchValue}
                        getSearchText={getSearchText}
                    />                    
                </div>                
            </div>
            <div className={'actions-section'}>
                <FilePlus className={'file-action'} onClick={() => createFile()}/>
                <Trash 
                    ref={trashButton} 
                    className={'file-action-disabled'} 
                    onClick={() => {deleteFileConfirm()}}
                />
            </div>
            <div className={'explorer-section'}>
                {                    
                    isLoading ?
                    <LoadingModal />
                    :
                    <div className={'files-dashboard'}>
                    {
                        typeSelected === 'files' && <FilesList /> 
                    }
                    {
                        typeSelected === 'dashboards' && <div>
                            Under Constrution
                        </div> 
                    }
                    </div>                                                                      
                }
            </div>
            {
                showPopup && <PopUpModal 
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