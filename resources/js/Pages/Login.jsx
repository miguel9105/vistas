import React, { useEffect, useState, useRef } from 'react';
import MainLayout from '../Layouts/MainLayout';
import { Link } from '@inertiajs/react';
import './Login.css';

// Rutas de videos (Asegúrate de que existan en public/videos)
const videos = [
  '/videos/derrumbe.mp4',
  '/videos/incendio.mp4',
  '/videos/tormenta.mp4'
];

const Login = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  // 🚨 1. CREAR UNA REFERENCIA para el elemento <video>
  const videoRef = useRef(null); 

  // 🚨 2. EFECTO: Cambia el índice del video cada 10 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
    }, 10000); // 10 segundos
    
    return () => clearInterval(interval);
  }, []);

  // 🚨 3. EFECTO: Carga y reproduce el nuevo video cuando el índice cambia
  useEffect(() => {
    if (videoRef.current) {
      // Forzar la carga de la nueva fuente
      videoRef.current.load(); 
      
      // Intentar reproducir (devuelve una Promesa, por eso el .catch)
      videoRef.current.play().catch(error => {
        // Esto es común si el navegador bloquea el autoplay. 
        // Como ya tiene 'muted', es probable que sea un problema de carga.
        console.warn("Error al intentar reproducir el video:", error);
      });
    }
  }, [currentVideoIndex]); // Se ejecuta cada vez que 'currentVideoIndex' cambia

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Simulación de inicio de sesión');
  };

  return (
    <MainLayout>
      <div className="video-login-wrapper">
        {/* Video de fondo */}
        <video
          // 🚨 4. ASIGNAR LA REFERENCIA
          ref={videoRef}
          
          // Mantenemos la key para asegurar el re-renderizado
          key={currentVideoIndex} 
          
          autoPlay
          loop
          muted // Esencial para el autoplay
          playsInline // Mejora la compatibilidad móvil
          className="background-video"
        >
          {/* 🚨 USAMOS EL ÍNDICE DEL ESTADO PARA SELECCIONAR LA FUENTE */}
          <source src={videos[currentVideoIndex]} type="video/mp4" />
          Tu navegador no soporta el video.
        </video>

        {/* Formulario (La estructura se mantiene intacta) */}
        <div className="login-container">
          <h2>Iniciar sesión</h2>
          <p>Escribe tu correo y contraseña</p>

          <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor='email'>Correo</label>
            <input type="email" id="email" placeholder="tucorreo@gmail.com" required />

            <label htmlFor='password'>Contraseña</label>
            <input type="password" id="password" placeholder="********" required />

            <div className="login-options">
              <div className="remember-me">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Recordarme</label>
              </div>
              <Link href="#" className="OLV">¿Olvidaste tu clave?</Link>
            </div>

            <button type="submit">Entrar</button>
          </form>

          <div className="login-footer">
            ¿No tienes cuenta? <Link href="/registro">Regístrate aquí</Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Login;