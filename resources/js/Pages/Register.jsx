import React, { useState, useEffect, useRef } from 'react';

import './Register.css';
import MainLayout from '../Layouts/MainLayout';
import { FaUser } from 'react-icons/fa'; // Instala si no lo tienes con: npm install react-icons


import { FaUser } from 'react-icons/fa'; // Importa el ícono de usuario
import axios from 'axios';
import { router, Link } from '@inertiajs/react';

// URL de tu API externa en Railway
const API_BASE_URL = 'https://api10desas-production-bdfa.up.railway.app/api/v1';


const videos = [
  '/videos/derrumbe.mp4',
  '/videos/incendio.mp4',
  '/videos/tormenta.mp4'
];

const Register = () => {
  const [preview, setPreview] = useState(null);
  const [currentVideo, setCurrentVideo] = useState(0);
  const fileInputRef = useRef(null);
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    telefono: '',
    password: '',
    password_confirmation: '',
    foto: null,
  });
  const [errors, setErrors] = useState({});
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideo((prev) => (prev + 1) % videos.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setForm(prev => ({ ...prev, foto: file })); // Guardar el objeto File
    }
  };

  const handleCircleClick = () => {
    if (!processing) {
        fileInputRef.current.click();
    }
  };
  
  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setErrors({});

    // 1. Crear objeto FormData para enviar datos y la foto
    const formData = new FormData();
    formData.append('nombre', form.nombre);
    formData.append('email', form.email);
    formData.append('telefono', form.telefono);
    formData.append('password', form.password);
    formData.append('password_confirmation', form.password_confirmation);
    
    if (form.foto) {
        formData.append('foto', form.foto); 
    }

    try {
      // 2. Petición POST a tu endpoint de Register con FormData
      await axios.post(`${API_BASE_URL}/register`, formData);

      alert('¡Registro exitoso! Por favor, inicia sesión.');
      router.visit(route('login')); // Redirigir a la vista de login con Inertia

    } catch (error) {
      setProcessing(false);
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        alert(error.response?.data?.message || 'Error al registrar. Revisa tus datos e intenta de nuevo.');
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
          <label>Nombre</label>
          <input 
            type="text" 
            placeholder="Nombre completo" 
            required 
            name="nombre" 
            value={form.nombre}
            onChange={handleChange}
            disabled={processing}
          />
          {errors.nombre && <div style={{ color: 'red' }}>{errors.nombre}</div>}

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

          <label>Teléfono</label>
          <input 
            type="tel" 
            placeholder="Número celular" 
            required 
            name="telefono" 
            value={form.telefono}
            onChange={handleChange}
            disabled={processing}
          />
          {errors.telefono && <div style={{ color: 'red' }}>{errors.telefono}</div>}

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

          <label>Repetir contraseña</label>
          <input 
            type="password" 
            placeholder="******" 
            required 
            name="password_confirmation" 
            value={form.password_confirmation}
            onChange={handleChange}
            disabled={processing}
          />
          {errors.password_confirmation && <div style={{ color: 'red' }}>{errors.password_confirmation}</div>}

          <label>Foto de tu rostro</label>
          <div className="circle-image" onClick={handleCircleClick}>
            {preview ? (
              <img src={preview} alt="Foto" />
            ) : (
              <FaUser className="default-user-icon" />
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleImageChange}
            required
            disabled={processing}
          />
          {errors.foto && <div style={{ color: 'red' }}>{errors.foto}</div>}


          <button type="submit" disabled={processing}>
            {processing ? 'Registrando...' : 'Crear cuenta'}
          </button>
        </form>

        <div className="register-footer">
          ¿Ya tienes cuenta? <Link href={route('login')}>Entrar</Link>
        </div>
      </div>
    </div>
    </MainLayout>
  );
  
};

export default Register;