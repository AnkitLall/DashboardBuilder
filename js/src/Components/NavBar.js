import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import LogoutModal from './LogoutModal';

import logo from './../../Assets/Logo 2.png';
import divider from './../../Assets/divider.png';
import './../css/NavBar.scss';

function NavBar() {

    let [showAccountInfo,setShowAccountInfo] = useState(false);
    
    let location = useLocation();
    let currentUser = useSelector(state => state.user.currentUser);

    const logout = () => {
        if(currentUser.name === 'Guest') {
            return;
        }
        
        if(showAccountInfo){
            setShowAccountInfo(false);
        }else {
            setShowAccountInfo(true);
        }
    }

    return (
        <div className={'nav-bar'}>   
            <div className={'logo-container'}>
                <img src={logo}></img>
            </div>
            <div className={'nav-panel'}>
                <div className={'home-nav-container'}>
                    <Link to='/Home'>
                        <button className={location.pathname==='/Home'?'button-standard-selected':'button-standard'}>
                            Home
                        </button> 
                    </Link>
                                       
                </div>
                <div className={'projects-nav-container'}>
                    <Link to='/Projects'>
                        <button className={location.pathname==='/Projects'?'button-standard-selected':'button-standard'}>
                            Projects
                        </button>
                    </Link>
                                        
                </div>
                <div className={'about-nav-container'}>                    
                    <Link to='/About'>
                        <button className={location.pathname==='/About'?'button-standard-selected':'button-standard'}>
                            About
                        </button>
                    </Link>                                        
                </div>
            </div>   
            <div className={'account-container'}>
                <div className={'account-info-container'}>
                    <button className={(currentUser.name === 'Guest')?'button-round-guest':'button-round-user'} 
                    onClick={() => logout()}>
                        {currentUser.name[0].toUpperCase()}
                    </button>
                    {
                        showAccountInfo && 
                        <LogoutModal 
                            setShowAccountInfo={setShowAccountInfo}
                        />
                    }
                </div>   
                {
                    currentUser.name === 'Guest' &&
                    <div className={'account-access-container'}>
                        <Link to='/Login'>
                            <button className={location.pathname==='/Login'?'button-standard-selected':'button-standard'}>
                                Login
                            </button>
                        </Link>
                        <img src={divider} className={'divider-img'}></img>
                        <Link to='/Register'>
                            <button className={location.pathname==='/Register'?'button-standard-selected':'button-standard'}>
                                Sign Up
                            </button> 
                        </Link>                                       
                    </div> 
                }  
            </div>
        </div>        
    );
}

export default NavBar;