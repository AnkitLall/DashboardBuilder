import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import className from 'classnames';
import { useHistory } from 'react-router-dom';

import { setDisplayCheck, setProjectDetails, setProjectsSelected } from '../Slices/ProjectSlice';
import '../css/TableOverlay.scss';

export function NoRowsOverlay() {

    let type = useSelector(state => state.projectListType.type);

    let [msg,setMsg] = useState(null);

    useEffect(() => {
        if(type === 'allProjects') {
            setMsg("You don't have any Projects.");            
        }else if(type === 'recentActivity') {
            setMsg("You don't have any recent activity.");
        }else if(type === 'drafts') {
            setMsg("You don't have any unsaved projects.");
        }
    },[type])

    return(
        <div>
            {msg}
        </div>
    )
}

export function ProjectCellRenderer(props) {

    let [projectName,setProjectName] = useState(props.value);
    let [classname,setClassname] = useState(props.cellInfo.cellIndex === 0?
                                                {'project-text': true}
                                                :
                                                {'other-text': true}
                                            );

    let dispatch = useDispatch();
    let history = useHistory();
    
    let checkbox = useRef(null);

    let selectedProjects = useSelector(state => state.projectPage.projectsSelected);

    useLayoutEffect(() => {
        if(!selectedProjects.length && checkbox.current) {
            checkbox.current.checked = false;
        }
    },[selectedProjects]);

    useEffect(() => {
        setProjectName(props.value);
    },[props.value]);

    function openProjectPage() {
        let rowId = props.cellInfo.rowIndex;
        let rowInfo = {
            id: parseInt(rowId),
            data: props.cellInfo.parent,
            parent: props.cellInfo.rowsList
        };
        dispatch(setDisplayCheck(true));
        dispatch(setProjectDetails(rowInfo));
        history.push("/Projects/ProjectPage");
    } 

    function selectProject(event) {
        let eventObj = {
            projectName: props.cellInfo.parent.projectName,
            selected: event.currentTarget.checked
        }
        dispatch(setProjectsSelected(eventObj));
    }

    return(
        <div className={'cell-container'} >
            {
                props.cellInfo.cellIndex === 0 && 
                <div className={'checkbox-container'}>
                    <input ref={checkbox} type={'checkbox'} onChange={(e) => selectProject(e)}/>
                </div>
            }      
            <div onClick={() => openProjectPage()} className={className(classname)}>
            {projectName}
            </div>                  
        </div>
    )
}