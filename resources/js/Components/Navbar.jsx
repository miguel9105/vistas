import React from 'react';
import { Link } from '@inertiajs/react'; 
import './Navbar.css';
import { FaHome, FaEnvelope, FaPlus, FaComments, FaUsers, FaSignInAlt, FaUserCircle } from 'react-icons/fa';

export const Navbar = () => {
  // Asegúrate de colocar el logo en public/images/logo.png
  const logo = "/images/logo.png"; 

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar-logo">
        <img src={logo} alt="Logo" className="logo-img" />
      </div>

      {/* Enlaces de navegación */}
      <div className="navbar-links">
        <Link href="/"><FaHome /> Inicio</Link>
        <Link href="/buzon"><FaEnvelope /> Buzón</Link>
        <Link href="/publicar"><FaPlus /> Publicar</Link>
        <Link href="/chat"><FaComments /> Chat</Link>
        <Link href="/conocenos"><FaUsers /> Conocenos</Link>
        <Link href="/perfil"><FaUserCircle /> Perfil</Link>
        <Link href="/login"><FaSignInAlt /> Inicio de sesión</Link>
      </div>
    </nav>
  );
};