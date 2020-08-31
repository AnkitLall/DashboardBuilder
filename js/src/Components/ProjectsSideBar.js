import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    setProjectListType
} from '../Slices/listSlice';

import './../css/Projects.scss';

export default function ProjectsSideBar(props) {

    let dispatch = useDispatch()
    let type = useSelector(state => state.projectListType.type);

    return(
        <div className={'side-bar-container'}>
            <div className={type==='allProjects'?'block-selected':'block'} onClick={()=>dispatch(setProjectListType('allProjects'))}>
                All Projects
            </div>
            <div className={type==='recentActivity'?'block-selected':'block'} onClick={()=>dispatch(setProjectListType('recentActivity'))}>
                Recents
            </div>
            <div className={type==='drafts'?'block-selected':'block'} onClick={()=>dispatch(setProjectListType('drafts'))}>
                Drafts
            </div>
        </div>
    )
}