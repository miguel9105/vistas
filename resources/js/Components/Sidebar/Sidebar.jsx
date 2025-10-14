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
// El CSS fue eliminado correctamente, solo mantenemos los imports de React y Librerías.


// Recibe el chat activo como prop para marcar el enlace
const Sidebar = ({ activeChat = 'general' }) => {
  const isLinkActive = (chatId) => activeChat === chatId;

  return (
    <div className="w-72 bg-white shadow-xl p-6 flex flex-col h-full border-r border-gray-200">
      
      {/* HEADER: Título con color principal */}
      <div className="mb-6 border-b border-gray-100 pb-3">
        <h2 className="text-xl font-bold text-blue-900 tracking-wider">CANALES</h2>
      </div>
      
      {/* NAVIGATION: Flex vertical, scroll si hay muchos ítems */}
      <nav className="flex flex-col gap-2 overflow-y-auto">
        
        {/* INICIO (HOME) */}
        <Link 
          href="/" 
          className={`
            flex items-center p-3 rounded-lg font-medium transition duration-200 no-underline text-base
            ${isLinkActive('home') 
              ? 'bg-red-600 text-white shadow-md shadow-red-500/50' 
              : 'text-gray-700 hover:bg-gray-100'
            }
          `}
        >
          <FaHome className="mr-3 text-lg" /> 
          Inicio
        </Link>

        {/* SOPORTE GENERAL - CORREGIDO */}
        <Link 
          href="/chat?chat=general" 
          className={`
            flex items-center p-3 rounded-lg font-medium transition duration-200 no-underline text-base
            ${isLinkActive('general') 
              ? 'bg-red-600 text-white shadow-md shadow-red-500/50' 
              : 'text-gray-700 hover:bg-gray-100'
            }
          `}
        >
          <FaHeadset className="mr-3 text-lg" /> 
          Soporte General
        </Link>

        {/* BOMBEROS */}
        <Link 
          href="/chat?chat=bomberos" 
          className={`
            flex items-center p-3 rounded-lg font-medium transition duration-200 no-underline text-base
            ${isLinkActive('bomberos') 
              ? 'bg-red-600 text-white shadow-md shadow-red-500/50' 
              : 'text-gray-700 hover:bg-gray-100'
            }
          `}
        >
          <FaFireExtinguisher className="mr-3 text-lg" /> 
          Bomberos
        </Link>

        {/* DEFENSA CIVIL */}
        <Link 
          href="/chat?chat=defensa-civil" 
          className={`
            flex items-center p-3 rounded-lg font-medium transition duration-200 no-underline text-base
            ${isLinkActive('defensa-civil') 
              ? 'bg-red-600 text-white shadow-md shadow-red-500/50' 
              : 'text-gray-700 hover:bg-gray-100'
            }
          `}
        >
          <FaShieldAlt className="mr-3 text-lg" /> 
          Defensa Civil
        </Link>
        
        {/* UDGR */}
        <Link 
          href="/chat?chat=udgr" 
          className={`
            flex items-center p-3 rounded-lg font-medium transition duration-200 no-underline text-base
            ${isLinkActive('udgr') 
              ? 'bg-red-600 text-white shadow-md shadow-red-500/50' 
              : 'text-gray-700 hover:bg-gray-100'
            }
          `}
        >
          <FaHospitalAlt className="mr-3 text-lg" /> 
          UDGR
        </Link>
        
        {/* CRUZ ROJA */}
        <Link 
          href="/chat?chat=cruz-roja" 
          className={`
            flex items-center p-3 rounded-lg font-medium transition duration-200 no-underline text-base
            ${isLinkActive('cruz-roja') 
              ? 'bg-red-600 text-white shadow-md shadow-red-500/50' 
              : 'text-gray-700 hover:bg-gray-100'
            }
          `}
        >
          <FaCross className="mr-3 text-lg" /> 
          Cruz Roja
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;