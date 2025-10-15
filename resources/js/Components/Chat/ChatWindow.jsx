  import React, { useState, useEffect, useRef } from "react";
  import { IoLocationOutline } from "react-icons/io5";
  import Ably from "ably";
  import axios from "axios";

  const ChatWindow = ({ chatId = "CHAT" }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const messagesEndRef = useRef(null);

    const API_BASE = "https://api10desas-production-bdfa.up.railway.app/api/v1";
    const ABLY_KEY = "KjUHEw.g4QvYw:6WIXqjibViuRbYbm-2-ZoLidx7EBnWaOd-6dXxCpDak";

    // 🔄 Scroll automático al último mensaje
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
      scrollToBottom();
    }, [messages]);

    // 📡 Conexión a Ably (tiempo real)
    useEffect(() => {
      const client = new Ably.Realtime({ key: ABLY_KEY });
      const channel = client.channels.get(chatId);

      channel.subscribe("new-message", (msg) => {
        console.log("📩 Mensaje recibido de Ably:", msg.data);
        
        // Evitar duplicados
        setMessages((prev) => {
          const exists = prev.some((m) => m.id === msg.data.id);
          if (exists) return prev;
          return [...prev, msg.data];
        });
      });

      return () => {
        channel.unsubscribe("new-message");
        client.close();
      };
    }, [chatId]);

    // 🧩 Cargar mensajes iniciales desde la API
    useEffect(() => {
      const fetchMessages = async () => {
        try {
          const res = await axios.get(`${API_BASE}/messages`);
          console.log("📥 Mensajes cargados:", res.data);
          setMessages(res.data.data || []);
        } catch (error) {
          console.error("Error cargando mensajes:", error);
        }
      };
      fetchMessages();
    }, []);

    // ✉️ Enviar mensaje
    const handleSend = async () => {
      if (!newMessage.trim()) return;

      const message = {
        content: newMessage,
        sender_profile_id: 6,
        receiver_profile_id: 7,
      };

      try {
        await axios.post(`${API_BASE}/messages`, message, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        
        console.log("✅ Mensaje enviado");
        setNewMessage("");
        
      } catch (error) {
        console.error("❌ Error enviando mensaje:", error.response?.data || error);
        alert("Error al enviar el mensaje");
      }
    };

    // 📍 Enviar ubicación
    const handleLocation = () => {
      if (!navigator.geolocation) {
        alert("Geolocalización no soportada por tu navegador");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const message = {
            content: `Mi ubicación: https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`,
            sender_profile_id: 6,
            receiver_profile_id: 7,
          };
          
          try {
            await axios.post(`${API_BASE}/messages`, message);
            console.log("📍 Ubicación enviada");
          } catch (error) {
            console.error("Error enviando ubicación:", error);
          }
        },
        () => alert("No se pudo obtener la ubicación")
      );
    };

    return (
      <div className="flex flex-col h-full bg-gray-50 shadow-inner">
        <div className="p-4 bg-blue-900 text-white text-lg font-bold shadow-md">
          {chatId.toUpperCase()}
        </div>

        <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3 bg-white">
          {messages.length > 0 ? (
            messages.map((msg, i) => (
              <div
                key={msg.id || i}
                className={`max-w-xs md:max-w-md lg:max-w-xl p-3 rounded-xl text-sm leading-relaxed ${
                  msg.sender_profile_id === 7
                    ? "bg-gray-200 text-gray-800 self-start"
                    : "bg-red-600 text-white self-end shadow-md"
                }`}
              >
                {msg.content}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400">No hay mensajes aún...</p>
          )}
          {/* Referencia para scroll automático */}
          <div ref={messagesEndRef} />
        </div>

        <div className="flex p-3 border-t border-gray-200 bg-gray-50 gap-3">
          <input
            type="text"
            placeholder="Escribe un mensaje..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 p-3 border border-gray-300 rounded-full outline-none focus:ring-2 focus:ring-blue-900 transition duration-150"
          />
          <button
            onClick={handleSend}
            className="px-5 py-3 rounded-full bg-blue-900 text-white font-semibold transition duration-200 hover:bg-blue-800 shadow-md"
          >
            Enviar
          </button>
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