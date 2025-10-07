import React from "react";
import MainLayout from '../Layouts/MainLayout';
import Sidebar from "../Components/Sidebar/Sidebar";
import ChatWindow from "../Components/Chat/ChatWindow";
import "./Chat.css";

// La prop 'chatId' se recibe del controlador de Laravel (routes/web.php)
const Chat = ({ chatId }) => { 
  const activeChat = chatId || "general"; 

  return (
    <MainLayout> 
      <div className="chat-page">
        {/* Pasamos el chat activo a Sidebar para resaltarlo */}
        <Sidebar activeChat={activeChat} /> 
        {/* Pasamos el chat activo a ChatWindow para establecer el encabezado */}
        <ChatWindow chatId={activeChat} />
      </div>
    </MainLayout>
  );
};

export default Chat;