import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react'; // Importamos router para la redirección
import { Navbar } from '../Components/Navbar';
import { Footer } from '../Components/Footer';

const MainLayout = ({ children }) => {
    // 1. Lógica de Dark Mode
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme === 'dark';
    });

    const toggleDarkMode = () => {
        setIsDarkMode(prev => !prev);
    };

    useEffect(() => {
        const rootElement = document.documentElement;
        if (isDarkMode) {
            rootElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            rootElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);
    
    // 2. Lógica de Autenticación
    // Derivamos el estado de autenticación del localStorage
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return localStorage.getItem('is_authenticated') === 'true';
    });
    
    // Función para cerrar sesión
    const handleLogout = () => {
        // Elimina todos los indicadores de sesión
        localStorage.removeItem('auth_token');
        localStorage.removeItem('is_authenticated');
        // Actualiza el estado local
        setIsAuthenticated(false);
        // Redirige al usuario a la página de login
        router.visit('/login'); 
    };

    // Esto asegura que el estado de isAuthenticated se actualice
    // si el valor en localStorage cambia (ej: después de un login exitoso en Login.jsx)
    useEffect(() => {
        const checkAuth = () => {
            setIsAuthenticated(localStorage.getItem('is_authenticated') === 'true');
        };
        // Puedes agregar un listener si necesitas que se actualice
        // cuando cambia en otra pestaña/ventana, pero esto es suficiente
        // para la carga inicial y la redirección.
        checkAuth(); 
    }, [children]); // Se puede re-ejecutar cuando cambia el contenido hijo (navegación Inertia)


    return (
        <div 
            className="min-h-screen flex flex-col transition-colors duration-500"
        >
            {/* Pasamos los props de autenticación a Navbar */}
            <Navbar 
                isDarkMode={isDarkMode} 
                toggleDarkMode={toggleDarkMode} 
                isAuthenticated={isAuthenticated}
                handleLogout={handleLogout}
            />
            
            <main className="flex-grow w-full">
                {children}
            </main>

            <Footer /> 
        </div>
    );
};

export default MainLayout;