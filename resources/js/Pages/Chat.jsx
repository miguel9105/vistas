import React from "react";
import MainLayout from '../Layouts/MainLayout';
// Asumimos que estos componentes están listos o serán adaptados para Tailwind
import Sidebar from "../Components/Sidebar/Sidebar"; 
import ChatWindow from "../Components/Chat/ChatWindow"; 

// La prop 'chatId' se recibe del controlador de Laravel (routes/web.php)
const Chat = ({ chatId }) => { 
    // Si chatId no está definido, usamos "general" como activo por defecto
    const activeChat = chatId || "general"; 

    return (
        // El MainLayout debe proporcionar una estructura que permita al contenido interno
        // (la página de chat) crecer y ocupar el espacio disponible.
        <MainLayout> 
            {/* chat-page: Implementación de la vista de chat con Tailwind.
              
              1. w-full h-screen: Ocupa todo el ancho y alto visible (menos la navegación del MainLayout, si existe).
              2. flex: Habilita el layout de barra lateral y ventana principal.
              3. overflow-hidden: Esencial para evitar barras de desplazamiento no deseadas en el layout principal.
              4. bg-gray-100: Fondo general de la aplicación, siguiendo el estilo.
            */}
            <div className="w-full h-screen flex overflow-hidden bg-gray-100">
                
                {/* Sidebar:
                  - Asumimos que 'Sidebar' maneja su propio ancho fijo (ej. w-72).
                  - La Sidebar generalmente tendrá 'overflow-y-auto' para poder hacer scroll en la lista de chats.
                */}
                <Sidebar activeChat={activeChat} /> 
                
                {/* ChatWindow:
                  - flex-1: Ocupa todo el espacio restante disponible horizontalmente.
                  - h-full: Ocupa todo el espacio vertical.
                  - overflow-y-auto: Permite el desplazamiento vertical para el contenido del chat (mensajes).
                */}
                <div className="flex-1 h-full overflow-y-auto">
                    <ChatWindow chatId={activeChat} />
                </div>
                
            </div>
        </MainLayout>
    );
};

export default Chat;