import React from "react";
import { Link } from "@inertiajs/react"; 
import {
  FaHome,
  FaFireExtinguisher,
  FaHeadset,
  FaShieldAlt,
  FaHospitalAlt,
  FaCross
} from "react-icons/fa";
import "./Sidebar.css";

// Recibe el chat activo como prop para marcar el enlace
const Sidebar = ({ activeChat = 'general' }) => {
  const isLinkActive = (chatId) => activeChat === chatId;

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Menú</h2>
      </div>
      <nav className="sidebar-nav">
        {/* Usamos /chat?chat=parametro para la navegación con Inertia */}
        <Link 
          href="/" 
          className={`sidebar-link ${isLinkActive('home') ? 'active' : ''}`}
        >
          <FaHome className="sidebar-icon" /> Inicio
        </Link>

        <Link 
          href="/chat?chat=general" 
          className={`sidebar-link ${isLinkActive('general') ? 'active' : ''}`}
        >
          <FaHeadset className="sidebar-icon" /> Soporte General
        </Link>

        <Link 
          href="/chat?chat=bomberos" 
          className={`sidebar-link ${isLinkActive('bomberos') ? 'active' : ''}`}
        >
          <FaFireExtinguisher className="sidebar-icon" /> Bomberos
        </Link>

        <Link 
          href="/chat?chat=defensa-civil" 
          className={`sidebar-link ${isLinkActive('defensa-civil') ? 'active' : ''}`}
        >
          <FaShieldAlt className="sidebar-icon" /> Defensa Civil
        </Link>
        
        <Link 
          href="/chat?chat=udgr" 
          className={`sidebar-link ${isLinkActive('udgr') ? 'active' : ''}`}
        >
          <FaHospitalAlt className="sidebar-icon" /> UDGR
        </Link>
        
        <Link 
          href="/chat?chat=cruz-roja" 
          className={`sidebar-link ${isLinkActive('cruz-roja') ? 'active' : ''}`}
        >
          <FaCross className="sidebar-icon" /> Cruz Roja
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;