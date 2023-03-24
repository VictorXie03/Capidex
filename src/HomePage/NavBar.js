import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';
import { IoLogOutOutline } from 'react-icons/io5';

const NavBar = ({ onClick }) => {
    return (
        <div className="Nav-heading">
            <NavLink className="Nav-heading-elements" to="/">Capidex</NavLink>
            <NavLink className="Nav-heading-elements" to="/cryptocurrency">Cryptocurrency</NavLink>
            <NavLink className="Nav-heading-elements" to="/stocks">Stocks</NavLink>
            <div className="Nav-heading-elements">

                <a className="Nav-heading-link" onClick={onClick}><IoLogOutOutline />Sign Out</a>
            </div>
        </div>
    );
};

export default NavBar;
