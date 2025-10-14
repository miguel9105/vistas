import React from "react";
// Eliminamos la importación del CSS: "./ChatItem.css";

const ChatItem = ({ name, description, image, onClick, active }) => {
    return (
        // chat-item: flex, padding, hover, rounded
        <div
            // El estado 'active' ahora usa el color de acento rojo
            className={`flex items-center p-3 cursor-pointer rounded-lg transition duration-200 
                ${active 
                    ? "bg-red-100 border-l-4 border-red-600 shadow-sm" 
                    : "hover:bg-gray-100"
                }
            `}
            onClick={onClick}
        >
            {/* chat-avatar: tamaño, circular, object-cover */}
            <img 
                src={image} 
                alt={name} 
                className="w-10 h-10 rounded-full object-cover mr-3" 
            />
            
            {/* chat-info */}
            <div className="flex flex-col truncate">
                {/* chat-name: Color de texto basado en el estado */}
                <h4 className={`m-0 text-base font-semibold truncate ${active ? "text-red-800" : "text-gray-800"}`}>
                    {name}
                </h4>
                {/* chat-description */}
                <p className="m-0 text-xs truncate text-gray-500">
                    {description}
                </p>
            </div>
        </div>
    );
};

export default ChatItem;