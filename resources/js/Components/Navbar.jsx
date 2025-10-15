import React from 'react';
import { Link } from '@inertiajs/react'; 

import { FaHome, FaEnvelope, FaPlus, FaComments, FaUsers, FaSignInAlt, FaUserCircle, FaMoon, FaSun } from 'react-icons/fa';

// La Navbar ahora recibe el estado y el alternador de MainLayout
export const Navbar = ({ isDarkMode, toggleDarkMode }) => {
  // Asegúrate de colocar el logo en public/images/logo.png
  const logo = "/images/logo.png"; 

  return (
    // Navbar: Fondo blanco, sombra, y responsive a dark:bg-gray-800
    <nav className="bg-white dark:bg-gray-800 shadow-lg transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-9">
            {/* Usamos justify-between para separar el logo (izq) de todo lo demás (der) */}
            <div className="flex justify-between items-center h-16">
                
                {/* LADO IZQUIERDO: Logo (Usamos h-8, mr-3 de tu código original) */}
                <div className="flex-shrink-0">
                    <Link href="/" className="flex items-center">
                       <img src={logo} alt="Logo" className="h-14 w-auto mr-4" />
                    </Link>
                </div>

                {/* LADO DERECHO: Agrupamos todo a la derecha */}
                <div className="flex items-center space-x-4 md:space-x-6">
                    
                    {/* GRUPO 1: Enlaces de Navegación (Tus estilos originales) */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-500 flex items-center p-2 rounded-lg transition duration-200">
                            <FaHome className="mr-1" /> Inicio
                        </Link>
                        {/* ASUMIMOS QUE BUZON ES LA RUTA PARA VER TODAS LAS PUBLICACIONES */}
                        <Link href="/publicaciones" className="text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-500 flex items-center p-2 rounded-lg transition duration-200">
                            <FaEnvelope className="mr-1" /> Publicaciones
                        </Link>
                        {/* ESTE ENLACE APUNTA A LA VISTA QUE CONTIENE EL FORMULARIO */}
                        <Link href="/publicar" className="text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-500 flex items-center p-2 rounded-lg transition duration-200">
                            <FaPlus className="mr-1" /> Publicar
                        </Link>
                        <Link href="/chat" className="text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-500 flex items-center p-2 rounded-lg transition duration-200">
                            <FaComments className="mr-1" /> Chat
                        </Link>
                        <Link href="/conocenos" className="text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-500 flex items-center p-2 rounded-lg transition duration-200">
                            <FaUsers className="mr-1" /> Conocenos
                        </Link>
                    </div>
                    
                    {/* Divisor Vertical */}
                    <div className="h-6 w-px bg-gray-300 dark:bg-gray-600 hidden md:block" aria-hidden="true" />

                    {/* GRUPO 2: Acciones y Modo Oscuro */}
                    <div className="flex items-center space-x-4">
                        
                        {/* Botón Perfil/Login */}
                        <Link href="/perfil" className="text-gray-600 dark:text-gray-300 hover:text-blue-900 dark:hover:text-red-500 hidden md:flex items-center">
                            <FaUserCircle className="mr-1" /> Perfil
                        </Link>
                        <Link href="/login" className="px-3 py-1 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-200 hidden md:flex items-center">
                            <FaSignInAlt className="mr-1" /> Iniciar Sesión
                        </Link>

                        {/* Botón de Modo Oscuro */}
                        <button
                            onClick={toggleDarkMode}
                            className="p-2 rounded-full transition duration-300 ease-in-out 
                                       text-gray-700 dark:text-yellow-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
                            aria-label="Toggle Dark Mode"
                        >
                            {isDarkMode ? (
                                <FaSun size={20} /> // Sol si está en modo oscuro
                            ) : (
                                <FaMoon size={20} /> // Luna si está en modo claro
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </nav>
  );
};