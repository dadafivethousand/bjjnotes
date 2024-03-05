import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import logo from '../Images/logo.png';
import '../Stylesheets/Navbar.css';
import Profile from './Profile';
import { useLoggedIn } from "./Context";
import { NavLink, useNavigate } from 'react-router-dom'; // Updated import here
import AddButton from './AddButton';
export default function Navbar() {
    const navigate = useNavigate();
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const { loggedIn, toggleLoggedIn } = useLoggedIn();
    const closeMenu = () => setClick(false);
    const logout = () => {
        navigate('/');
        toggleLoggedIn();
    };

    return loggedIn && (
        <div className='header'>
            <nav className='navbar'>
            <li className='nav-item'>
                        <img src={logo} className='logo' alt="Logo" />
                    </li>
                <div className='hamburger' onClick={handleClick}>
                    {click ? <FaTimes size={30} style={{ color: '#ffffff' }} />
                        : <FaBars size={30} style={{ color: '#ffffff' }} />}
                </div>
                <ul className={click ? "nav-menu active" : "nav-menu"}>
                        <li className='nav-item'>
                            <NavLink to='/journal' onClick={closeMenu} activeclassname='active'>Journal</NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink to='/film' onClick={closeMenu} activeclassname='active'>Film Study</NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink to='/instructionals' onClick={closeMenu} activeclassname='active'>Instructionals</NavLink>
                        </li>
                        <li className='nav-item mobile'>
                            <NavLink className={'mobile'} to='/pwchange' onClick={closeMenu} activeclassname='active'>Change Password</NavLink>
                        </li>
                        <li className='nav-item mobile'>
                            <a className={'mobile'} href='/' onClick={logout}>Logout</a>
                        </li>
                        <li className='nav-item profile'>
                            <Profile logout={logout} />
                        </li>
                   
                </ul>
               
            </nav>

          <div className='AddButtonBackground'>
                <AddButton />
          </div>
            
        </div>
       

    );
}
