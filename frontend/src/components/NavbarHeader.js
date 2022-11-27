import React from 'react'
import { NavLink } from 'react-router-dom'
import "./css/NavbarHeader.css"
export const NavbarHeader = () => {
  const navLinkStyles = ({ isActive }) => {
    return {
      fontWeight: isActive ? 'bold' : 'normal',
    }
  }

  return (
    <React.Fragment>
      <nav className="NavbarItems">
      <h1 className="navbar-logo">
        Nikolas Silva Lunkes <i className="fab fa-react"></i>
      </h1>
      

      <ul className=''>
      <NavLink to='/'  className='nav-links'>
        Home
      </NavLink>
      <NavLink to='/about'  className='nav-links'>
        About
      </NavLink>
      </ul>
    </nav>
    </React.Fragment>
  );
}

