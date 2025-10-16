// src/pages/Login.jsx

import React, { useEffect, useState, useRef } from 'react';
import MainLayout from '../Layouts/MainLayout';
import { Link, router } from '@inertiajs/react';
import './Login.css';
import axios from 'axios';

// URL de tu API externa en Railway
const API_BASE_URL = 'https://api10desas-production-bdfa.up.railway.app/api/v1';

// Rutas de videos (Asegúrate de que existan en public/videos)
const videos = [
  '/videos/derrumbe.mp4',
  '/videos/incendio.mp4',
  '/videos/tormenta.mp4'
];

const Login = () => {

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRef = useRef(null); 
  const [data, setData] = useState({ email: '', password: '', remember: false });
  const [errors, setErrors] = useState({});
  const [processing, setProcessing] = useState(false);


  // EFECTO: Cambia el índice del video cada 10 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
    }, 10000); 
    
    return () => clearInterval(interval);
  }, []);


  // EFECTO: Carga y reproduce el nuevo video cuando el índice cambia
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load(); 
      videoRef.current.play().catch(error => {
        console.warn("Error al intentar reproducir el video:", error);
      });
    }
  }, [currentVideoIndex]);


  // Función para manejar los cambios en los inputs
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
      // Petición POST a /users/login para validar credenciales
      const response = await axios.post(`${API_BASE_URL}/users/login`, {
        email: data.email,
        password: data.password,
      });

      // 1. Guardar el token (opcional, para mantener el dato de la API)
      const { token } = response.data;
      localStorage.setItem('auth_token', token);
      
      // 2. ✅ CÓDIGO CLAVE: Establecer el flag de sesión simple para el frontend
      localStorage.setItem('is_authenticated', 'true'); 
      
      // 3. Redirigir a Home
      router.visit('/'); 
      
    } catch (error) {
      setProcessing(false);
      if (error.response && error.response.data && error.response.data.errors) {
        // Errores de validación de Laravel
        setErrors(error.response.data.errors);
      } else {
        // Error genérico o de credenciales
        alert(error.response?.data?.message || 'Error al iniciar sesión. Verifica tus credenciales.');
      }
    }

  }; 

  return ( 
    <MainLayout>
      <div className="video-login-wrapper">
        <video ref={videoRef} autoPlay loop muted className="background-video">
          <source src={videos[currentVideoIndex]} type="video/mp4" />
          Tu navegador no soporta videos HTML5.
        </video>
        
        <div className="login-container">
          <h1>Bienvenido de nuevo</h1>
          <form onSubmit={handleSubmit} className="login-form">
            <label htmlFor='email'>Correo Electrónico</label>
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

            <div className="remember-me">
              <input 
                type="checkbox" 
                id="remember" 
                checked={data.remember} 
                onChange={handleChange} 
              />
              <label htmlFor="remember">Recuérdame</label>
            </div>

            <button type="submit" disabled={processing}>
              {processing ? 'Verificando...' : 'Iniciar Sesión'}
            </button>
          </form>

          <div className="login-footer">
            ¿No tienes cuenta? <Link href="/register">Crear cuenta</Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default Login;