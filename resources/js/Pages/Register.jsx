// src/pages/Register.jsx

import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import axios from 'axios';

import './Register.css';
import MainLayout from '../Layouts/MainLayout';

// URL de tu API externa en Railway
const API_BASE_URL = 'https://api10desas-production-bdfa.up.railway.app/api/v1';

const videos = [
  '/videos/derrumbe.mp4',
  '/videos/incendio.mp4',
  '/videos/tormenta.mp4'
];

const Register = () => {
  const [currentVideo, setCurrentVideo] = useState(0);
  
  // Estado para los campos del formulario según la tabla users
  const [form, setForm] = useState({
    firstname: '', 
    lastname: '',  
    email: '',
    location: '',  
    password: '',
  });

  const [errors, setErrors] = useState({}); // Para errores de validación del backend
  const [processing, setProcessing] = useState(false); 

  // Efecto para cambiar el video de fondo cada 10 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideo((prev) => (prev + 1) % videos.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);
  
  // Maneja el cambio de valores en los inputs del formulario
  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  /**
   * FUNCIÓN ACTUALIZADA: Conexión al endpoint de registro /users
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setErrors({}); // Limpiar errores previos

    try {
      // Endpoint de Registro: POST a /users (del apiResource)
      const response = await axios.post(`${API_BASE_URL}/users`, {
        firstname: form.firstname,
        lastname: form.lastname,
        email: form.email,
        location: form.location,
        password: form.password,
      });

      console.log('Registro exitoso:', response.data);
      alert('¡Registro exitoso! Serás redirigido para iniciar sesión.');
      
      // Redirigir al login
      router.visit('/login');

    } catch (error) {
      setProcessing(false);
      if (error.response) {
          if (error.response.data.errors) {
            // Errores de validación de Laravel
            setErrors(error.response.data.errors);
          } else {
            // Otros errores del API (p.ej., el correo ya existe, error de servidor)
            alert(error.response.data.message || 'Ocurrió un error al registrarse. Intenta de nuevo.');
          }
      } else {
          alert('Error de conexión con la API.');
      }
    }
  };


  return (
    <MainLayout>
    <div className="video-register-wrapper">
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

      <div className="register-container">
        <h2>Registrarse</h2>
        <p>Llene los datos para crear tu cuenta</p>

        <form className="register-form" onSubmit={handleSubmit}>
          
          {/* Campo 'firstname' */}
          <label>Nombre</label>
          <input 
            type="text" 
            placeholder="Nombre" 
            required 
            name="firstname" 
            value={form.firstname}
            onChange={handleChange}
            disabled={processing}
          />
          {errors.firstname && <div style={{ color: 'red' }}>{errors.firstname}</div>}

          {/* Campo 'lastname' */}
          <label>Apellido</label>
          <input 
            type="text" 
            placeholder="Apellido" 
            required 
            name="lastname" 
            value={form.lastname}
            onChange={handleChange}
            disabled={processing}
          />
          {errors.lastname && <div style={{ color: 'red' }}>{errors.lastname}</div>}


          {/* Campo 'email' */}
          <label>Correo</label>
          <input 
            type="email" 
            placeholder="ejemplo@gmail.com" 
            required 
            name="email" 
            value={form.email}
            onChange={handleChange}
            disabled={processing}
          />
          {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}

          {/* Campo 'location' */}
          <label>Ubicación</label>
          <input 
            type="text" 
            placeholder="Ciudad o País" 
            required 
            name="location" 
            value={form.location}
            onChange={handleChange}
            disabled={processing}
          />
          {errors.location && <div style={{ color: 'red' }}>{errors.location}</div>}


          {/* Campo 'password' */}
          <label>Contraseña</label>
          <input 
            type="password" 
            placeholder="******" 
            required 
            name="password" 
            value={form.password}
            onChange={handleChange}
            disabled={processing}
          />
          {errors.password && <div style={{ color: 'red' }}>{errors.password}</div>}

          <button type="submit" disabled={processing}>
            {processing ? 'Registrando...' : 'Crear cuenta'}
          </button>
        </form>

        <div className="register-footer">
          ¿Ya tienes cuenta? <a href="/login">Entrar</a>
        </div>
      </div>
    </div>
    </MainLayout>
  );
  
};

export default Register;