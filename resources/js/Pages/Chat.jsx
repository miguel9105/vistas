// src/pages/Chat.jsx

import React, { useEffect, useState } from "react"; 
import MainLayout from '../Layouts/MainLayout';
import { router } from '@inertiajs/react'; 
import Sidebar from "../Components/Sidebar/Sidebar"; 
import ChatWindow from "../Components/Chat/ChatWindow"; 

const Chat = ({ chatId }) => { 
    
    const [loading, setLoading] = useState(true);

    // 💡 LÓGICA DE VERIFICACIÓN DE SESIÓN SOLICITADA
    useEffect(() => {
        const isAuthenticated = localStorage.getItem('is_authenticated');
        
        if (isAuthenticated !== 'true') {
            router.visit('/login'); // Redirige si no está autenticado
        } else {
            setLoading(false); // Permite la renderización del contenido
        }
    }, []); 

    const activeChat = chatId || "general"; 
    
    if (loading) {
        return (
            <MainLayout>
                <div className="w-full h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-xl font-semibold">
                    Verificando sesión. Por favor espere...
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout> 
            <div className="w-full h-screen flex overflow-hidden bg-gray-100 dark:bg-gray-800">
                {/* Sidebar */}
                <Sidebar activeChat={activeChat} /> 
                
                {/* ChatWindow */}
                <div className="flex-1 h-full overflow-y-auto">
                    <ChatWindow chatId={activeChat} />
                </div>
                
            </div>
        </MainLayout>
    );
};

export default Chat;