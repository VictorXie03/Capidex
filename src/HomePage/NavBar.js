import React from 'react';
import { NavLink } from 'react-router-dom';
import { IoLogOutOutline } from 'react-icons/io5';
import './NavBar.css';

const NavBar = ({ onClick }) => {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <NavLink to="/" className="navbar-logo">
                    <span className="logo-bracket">[</span>
                    CAPIDEX
                    <span className="logo-bracket">]</span>
                </NavLink>
                <span className="navbar-tagline">MARKET TERMINAL</span>
            </div>
            <div className="navbar-links">
                <NavLink className="nav-link" to="/cryptocurrency">CRYPTO</NavLink>
                <span className="nav-divider">|</span>
                <NavLink className="nav-link" to="/stocks">EQUITIES</NavLink>
                <span className="nav-divider">|</span>
                <NavLink className="nav-link" to="/">WATCHLIST</NavLink>
            </div>
            <div className="navbar-right">
                <button className="logout-btn" onClick={onClick}>
                    <IoLogOutOutline />
                    <span>SIGN OUT</span>
                </button>
            </div>
        </nav>
    );
};

export default NavBar;