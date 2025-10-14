import React, { useState, useEffect } from 'react';
import { Navbar } from '../Components/Navbar';
import { Footer } from '../Components/Footer';

const MainLayout = ({ children }) => {
    // 1. Estado para el modo oscuro, inicializado desde localStorage
    const [isDarkMode, setIsDarkMode] = useState(() => {
        // Lee la preferencia del sistema o de localStorage
        const savedTheme = localStorage.getItem('theme');
        // Usamos dark por defecto si no hay preferencia guardada, para consistencia con tu último deseo
        if (savedTheme === 'dark') {
            return true;
        }
        // Si no hay preferencia, lee el sistema o usa un valor (aquí lo forzamos a falso inicialmente)
        return false; 
    });

    // 2. Función para alternar el modo oscuro
    const toggleDarkMode = () => {
        setIsDarkMode(prev => !prev);
    };

    // 3. Efecto para aplicar/remover la clase 'dark' al <html> y guardar la preferencia
    useEffect(() => {
        const rootElement = document.documentElement; // Aplica al <html>
        
        // Mueve la clase 'dark' del <div> al <html>
        if (isDarkMode) {
            rootElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            rootElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);
    
    // Si quieres que inicie oscuro y la Navbar use el modo oscuro, puedes forzar el 'dark' 
    // en la raíz del <html> aquí si no quieres depender de la lógica de localStorage
    // Pero la lógica de arriba ya maneja eso de forma correcta.

    return (
        // CLAVE: Añadimos las clases de fondo al <div> principal: 
        // bg-gray-100 por defecto y dark:bg-gray-900 en modo oscuro
        <div 
            className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 transition-colors duration-500"
        >
            {/* Pasamos el estado y la función a la Navbar para el toggle */}
            <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
            
            {/* El contenido principal que crece para llenar el espacio */}
            <main className="flex-grow w-full">
                {children}
            </main>

            <Footer /> 
        </div>
    );
};

export default MainLayout;