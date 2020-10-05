import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Journals, Clock, FileEarmark } from 'react-bootstrap-icons';

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
                <div className={'button-block'}>
                    <Journals size={20} className={'icon'}/>
                    <span className={'text'}>
                        All Projects
                    </span>
                </div>                
            </div>
            <div className={type==='recentActivity'?'block-selected':'block'} onClick={()=>dispatch(setProjectListType('recentActivity'))}>
                <div className={'button-block'}>
                    <Clock size={20} className={'icon'}/>
                    <span className={'text'}>
                        Recents
                    </span>
                </div>                
            </div>
            <div className={type==='drafts'?'block-selected':'block'} onClick={()=>dispatch(setProjectListType('drafts'))}>
                <div className={'button-block'}>
                    <FileEarmark size={20} className={'icon'}/>
                    <span className={'text'}>
                        Drafts
                    </span>
                </div> 
            </div>
        </div>
    )
}