import React, { useState, useEffect } from 'react';
import { Navbar } from '../Components/Navbar';
import { Footer } from '../Components/Footer';

const MainLayout = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            return true;
        }
        return false; 
    });

    const toggleDarkMode = () => {
        setIsDarkMode(prev => !prev);
    };

    useEffect(() => {
        const rootElement = document.documentElement;
        
        if (isDarkMode) {
            rootElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            // 🚨 AJUSTE EN EL CSS GLOBAL PARA MANEJAR EL FONDO DE LA PÁGINA:
            // Asegúrate de que tu body o html en app.css tenga el fondo deseado 
            // O déjalo transparente para que el video se vea.
        } else {
            rootElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);
    
    return (
        // 🚨 CAMBIO CLAVE: REMOVEMOS bg-gray-100 dark:bg-gray-900
        // Esto permite que el fondo del componente hijo (Login) sea visible.
        // Si necesitas un color de fondo para OTRAS páginas, aplícalo directamente 
        // en el 'body' a través de 'app.css' o usa una clase condicional aquí.
        <div 
            className="min-h-screen flex flex-col transition-colors duration-500"
        >
            <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
            
            <main className="flex-grow w-full">
                {children}
            </main>

            <Footer /> 
        </div>
    );
};

export default MainLayout;

// El contenido de createInertiaApp y los imports no se modifican
// ...