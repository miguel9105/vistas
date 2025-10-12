import React, { useEffect, useState } from 'react';
import MainLayout from '../Layouts/MainLayout'; // Asegura que esta ruta exista
import { Link, router } from '@inertiajs/react';
import axios from 'axios';
import './Login.css'; // Asegura que tu CSS exista

// URL de tu API externa en Railway
const API_BASE_URL = 'https://api10desas-production-bdfa.up.railway.app/api/v1';

// Rutas de videos (Asegúrate de que existan en public/videos)
const videos = [
  '/videos/derrumbe.mp4',
  '/videos/incendio.mp4',
  '/videos/tormenta.mp4'
];

const Login = () => {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [data, setData] = useState({ email: '', password: '', remember: false });
  const [errors, setErrors] = useState({});
  const [processing, setProcessing] = useState(false);

  // Cambia el video cada 10 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideo((prev) => (prev + 1) % videos.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setData(prev => ({ 
        ...prev, 
        [id]: type === 'checkbox' ? checked : value 
    }));
  };

  // Función para manejar el envío del formulario y conectar a la API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setErrors({});

    try {
      // Petición POST a tu endpoint de Login en la API externa
      const response = await axios.post(`${API_BASE_URL}/login`, {
        email: data.email,
        password: data.password,
      });

      // 1. Guardar el token en localStorage
      const { token } = response.data;
      localStorage.setItem('auth_token', token);
      
      // 2. Redirigir con Inertia (asume que la ruta /dashboard existe localmente)
      router.visit('/dashboard'); 
      
    } catch (error) {
      setProcessing(false);
      if (error.response && error.response.data && error.response.data.errors) {
        // Errores de validación de Laravel (si la API usa el mismo formato)
        setErrors(error.response.data.errors);
      } else {
        // Error genérico o de credenciales
        // Usamos una alerta para informar del fallo
        alert(error.response?.data?.message || 'Error al iniciar sesión. Verifica tus credenciales.');
      }
    }
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
            <input 
              type="email" 
              id="email" 
              placeholder="tucorreo@gmail.com" 
              required 
              value={data.email} 
              onChange={handleChange}
            />
            {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}

            <label htmlFor='password'>Contraseña</label>
            <input 
              type="password" 
              id="password" 
              placeholder="********" 
              required 
              value={data.password} 
              onChange={handleChange}
            />
            {errors.password && <div style={{ color: 'red' }}>{errors.password}</div>}

            <div className="login-options">
              <div className="remember-me">
                <input 
                  type="checkbox" 
                  id="remember" 
                  checked={data.remember} 
                  onChange={handleChange}
                />
                <label htmlFor="remember">Recordarme</label>
              </div>
              {/* CAMBIO CLAVE: Usamos la URL fija '/forgot-password' para evitar el error 'Ziggy' */}
              <Link href="/forgot-password" className="OLV">¿Olvidaste tu clave?</Link> 
            </div>

            <button type="submit" disabled={processing}>
                {processing ? 'Cargando...' : 'Entrar'}
            </button>
          </form>

          <div className="login-footer">
            {/* CAMBIO CLAVE: Usamos la URL fija '/register' para evitar el error 'Ziggy' */}
            ¿No tienes cuenta? <Link href="/register">Regístrate aquí</Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Login;
