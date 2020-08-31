import React from 'react';

import './../css/PopUpBody.scss';

export function CreateNewProject(props) {

    return(
        <div className={'create-project-container'}>
            <div className={'text-box-container'}>
                <input className={'text-box'} type={'text'} placeholder={'Enter Project Name'}/>
            </div>            
            <div className={'button-container'}>
                <button className={'cancel-button'}>Cancel</button>
                <button className={'save-button'}>Save</button>
            </div>
        </div>
    )
}

export function DeleteProjects(props) {

    return(
        <div>
            delete
        </div>
    )
}