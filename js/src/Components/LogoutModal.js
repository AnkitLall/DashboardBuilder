import React, { useState,useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import './../css/NavBar.scss';

import {
    setUser 
} from './../Slices/AuthSlice';

export default function LogoutModal(props) {

    let [isLoggingOut,setIsLoggingOut] = useState(false);
    let currentUser = useSelector(state => state.user.currentUser);

    let dispatch = useDispatch();
    
    useEffect(() => {
        if(isLoggingOut) {
            dispatch(setUser({
                name: 'Guest',
                email: ''
            }));
            setIsLoggingOut(false);
            props.setShowAccountInfo(false);
        }
    },[isLoggingOut])

    return(
        <div className={'account-info-panel'}>
            <div className={'info-section'}>
                <div>
                    {currentUser.name}
                </div>
                <div>
                    {currentUser.email}
                </div>
            </div>
            <div className={'action-section'}>
                <button className={'button-block-lg-no-border'} onClick={() => setIsLoggingOut(true)}>
                    Logout
                </button>
            </div>
        </div>
    );
}