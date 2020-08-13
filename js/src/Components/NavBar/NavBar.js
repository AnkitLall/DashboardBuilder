import React from 'react';
import { Link } from 'react-router-dom';
import logo from './../../../Assets/Logo 2.png';
import divider from './../../../Assets/divider.png';
import './../../css/NavBar.scss';

function NavBar(props) {
    return (
        <div className={'nav-bar'}>   
            <div className={'logo-container'}>
                <img src={logo}></img>
            </div>
            <div className={'nav-panel'}>
                <div className={'home-container'}>
                    <Link to='/Home'>
                        <button className={'button-basic'}>
                            Home
                        </button> 
                    </Link>
                                       
                </div>
                <div className={'projects-container'}>
                    <Link to='/Projects'>
                        <button className={'button-basic'}>
                            Projects
                        </button>
                    </Link>
                                        
                </div>
                <div className={'about-container'}>                    
                    <Link to='/About'>
                        <button className={'button-basic'}>
                            About
                        </button>
                    </Link>                                        
                </div>
            </div>   
                <div className={'account-info-container'}>
                    <button className={'button-round'}>{props.userName[0]}</button>
                </div>       
                <div className={'account-access-container'}>
                    <button className={'button-basic'}>
                        Login
                    </button>
                    <img src={divider}></img>
                    <button className={'button-basic'}>
                        Sign Up
                    </button>                    
                </div>            
        </div>        
    );
}

export default NavBar;