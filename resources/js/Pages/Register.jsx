import React, { useState, useEffect, useRef } from 'react';

import './Register.css';
import MainLayout from '../Layouts/MainLayout';
import { FaUser } from 'react-icons/fa'; // Importa el ícono de usuario (Asegúrate de tenerlo instalado: npm install react-icons)

// NOTA: Se ha eliminado la importación de axios y la conexión con la API y Inertia.

// URL de la API eliminada
// const API_BASE_URL = 'https://api10desas-production-bdfa.up.railway.app/api/v1';


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
  // Se ha eliminado el estado de errores de la API
  // const [errors, setErrors] = useState({});
  const [processing, setProcessing] = useState(false); // Se mantiene para simular un envío

  // Efecto para cambiar el video de fondo cada 10 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideo((prev) => (prev + 1) % videos.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // Maneja la selección de imagen para la vista previa
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setForm(prev => ({ ...prev, foto: file })); // Guardar el objeto File
    }
  };

  // Simula el click en el input de archivo al hacer click en el círculo
  const handleCircleClick = () => {
    if (!processing) {
      fileInputRef.current.click();
    }
  };
  
  // Maneja el cambio de valores en los inputs del formulario
  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  /**
   * NOTA: Función handleSubmit modificada.
   * Se ha eliminado toda la lógica de conexión con axios y el manejo de errores/redirección de Inertia.
   * Ahora solo simula un proceso de envío y muestra una alerta.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    setProcessing(true);
    // setErrors({}); // Eliminado

    // Simular envío de datos
    console.log('Datos a enviar (simulación):', form);

    // Simular un retardo para mostrar el estado de "Registrando..."
    setTimeout(() => {
        setProcessing(false);
        alert('¡Formulario simulado enviado! (La conexión a la API está deshabilitada)');
        // router.visit(route('login')); // Eliminado
    }, 1500);

    // Lógica original de axios eliminada:
    /*
    const formData = new FormData();
    // ... append form fields ...
    try {
      await axios.post(`${API_BASE_URL}/register`, formData);
      // ... success logic ...
    } catch (error) {
      // ... error logic ...
    }
    */
  };

  // Se mantiene el estado `errors` localmente para evitar errores de referencia
  const errors = {}; 

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
          {/* Se cambió el componente <Link> de Inertia por un <a> simple */}
          ¿Ya tienes cuenta? <a href="/login">Entrar</a>
        </div>
      </div>
    </div>
    </MainLayout>
  );
  
};

export default Register;