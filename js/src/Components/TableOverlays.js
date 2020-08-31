import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

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