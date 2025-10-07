import React, { useEffect, useState } from 'react';
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
  const [currentVideo, setCurrentVideo] = useState(0);

  // Cambia el video cada 10 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideo((prev) => (prev + 1) % videos.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica de inicio de sesión de Inertia:
    // Inertia.post(route('login.attempt'), data);
    alert('Simulación de inicio de sesión');
  };

  return (
    <MainLayout>
      <div className="video-login-wrapper">
        {/* Video de fondo */}
        <video
          key={currentVideo}
          autoPlay
          loop
          muted
          className="background-video"
        >
          <source src={videos[currentVideo]} type="video/mp4" />
          Tu navegador no soporta el video.
        </video>

        {/* Formulario */}
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