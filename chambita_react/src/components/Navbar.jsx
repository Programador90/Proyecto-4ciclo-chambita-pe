import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/vite.svg';

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="navbar-title">CHAMBITA-PE</div>
      <div className="navbar-logout">
        <Link to="/logout" className="navbar-link">Cerrar sesión</Link>
      </div>
    </div>
  );
};

export default Navbar;
