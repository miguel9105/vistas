import React, { useState } from "react";
import { IoLocationOutline } from "react-icons/io5"; 
// Eliminamos la importación del CSS: './ChatWindow.css';

const ChatWindow = ({ chatId = 'CHAT' }) => {
    const [messages, setMessages] = useState([
        { id: 1, content: "Hola, ¿cómo podemos ayudarte?", sender: "admin" },
        { id: 2, content: "Tengo una emergencia en mi zona.", sender: "user" },
        { id: 3, content: "Porfavor regalanos tu ubicacion", sender: "admin" },
    ]);

    const [newMessage, setNewMessage] = useState("");

    const handleSend = () => {
        if (!newMessage.trim()) return;
        const message = { id: Date.now(), content: newMessage, sender: "user" };
        setMessages([...messages, message]);
        setNewMessage("");
    };

    const handleLocation = () => {
        if (!navigator.geolocation) {
            alert("Geolocalización no soportada por tu navegador");
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                // NOTA: Se corrige el link de Google Maps, el anterior tenía error de sintaxis.
                const locationMessage = {
                    id: Date.now(),
                    content: `Mi ubicación: https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`, 
                    sender: "user",
                };
                setMessages([...messages, locationMessage]);
            },
            () => alert("No se pudo obtener la ubicación")
        );
    };

    return (
        // chat-window: flex-1, flex-col, h-full, fondo claro
        <div className="flex flex-col h-full bg-gray-50 shadow-inner">
            
            {/* chat-header: Azul principal, texto blanco, sombra */}
            <div className="p-4 bg-blue-900 text-white text-lg font-bold shadow-md">
                {chatId.toUpperCase()}
            </div>

            {/* chat-body: flex-1, overflow-y-auto, fondo blanco para los mensajes */}
            <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3 bg-white">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        // message: max-w-2/3, padding, rounded-xl, tamaño de fuente
                        className={`max-w-xs md:max-w-md lg:max-w-xl p-3 rounded-xl text-sm leading-relaxed ${
                            msg.sender === "admin" 
                                ? "bg-gray-200 text-gray-800 self-start" // received: gris para el administrador
                                : "bg-red-600 text-white self-end shadow-md" // sent: Rojo de acento para el usuario
                        }`}
                    >
                        {msg.content}
                    </div>
                ))}
            </div>

            {/* chat-input: Input y botones de envío */}
            <div className="flex p-3 border-t border-gray-200 bg-gray-50 gap-3">
                <input
                    type="text"
                    placeholder="Escribe un mensaje..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    // input: flex-1, padding, border-radius, focus-ring del color primario
                    className="flex-1 p-3 border border-gray-300 rounded-full outline-none focus:ring-2 focus:ring-blue-900 transition duration-150"
                />
                
                {/* Botón Enviar: Azul principal */}
                <button 
                    onClick={handleSend}
                    className="px-5 py-3 rounded-full bg-blue-900 text-white font-semibold transition duration-200 hover:bg-blue-800 shadow-md"
                >
                    Enviar
                </button>
                
                {/* Botón Ubicación: Rojo de acento (o gris si quieres menos énfasis) */}
                <button 
                    onClick={handleLocation} 
                    className="px-4 py-3 rounded-full bg-red-600 text-white transition duration-200 hover:bg-red-500 shadow-md flex items-center justify-center"
                >
                    <IoLocationOutline size={24} />
                </button>
            </div>
        </div>
    );
};

export default ChatWindow;