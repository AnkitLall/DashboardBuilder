import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

function NavBar(props) {
    return (
        <div className={'nav-bar'}>   
            <p><Link to='/Home'>Home</Link></p>
            <p><Link to='/Projects'>Projects</Link></p>
        </div>        
    );
}

export default NavBar;