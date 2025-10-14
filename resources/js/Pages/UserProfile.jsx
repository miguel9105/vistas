/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState, useRef } from 'react';
import './UserProfile.css';
import MainLayout from '../Layouts/MainLayout';
// Importamos 'router' pero ya no lo usamos para redirecciones por API error
import { FaCamera, FaImage, FaTrash, FaUser, FaCheckCircle } from 'react-icons/fa'; // Íconos de Font Awesome
// import axios from 'axios'; // 🚫 REMOVED: No more API connection
// import { router } from '@inertiajs/react'; // 🚫 REMOVED: Inertia router is not strictly needed for this file after removing API logic

// 🚫 REMOVED: API_BASE_URL is no longer needed

const videos = [
  '/videos/derrumbe.mp4',
  '/videos/incendio.mp4',
  '/videos/tormenta.mp4'
];

// LISTA DE VEREDAS DISPONIBLES (Descomentada para que funcione el select)
const veredasDisponibles = [
  'Vereda San Rafael', 'Vereda San Diego', 'Vereda El Triunfo', 'Vereda La Primavera',
  'Vereda El Rosal', 'Vereda La Esperanza', 'Vereda Los Pinos', 'Vereda San Antonio',
  'Vereda El Paraíso', 'Vereda El Carmen', 'Vereda El Roble', 'Vereda La Palma',
  'Vereda Santa Rosa', 'Vereda El Placer', 'Vereda La Cumbre', 'Vereda Las Delicias',
  'Vereda La Floresta', 'Vereda Los Ángeles', 'Vereda La Unión', 'Vereda Monteverde',
  'Vereda Alto Bonito', 'Vereda El Edén', 'Vereda Campo Hermoso', 'Vereda La Loma',
  'Vereda Las Brisas', 'Vereda El Jardín', 'Vereda Bella Vista', 'Vereda El Mirador',
  'Vereda San José', 'Vereda La Ceiba', 'Vereda El Progreso', 'Vereda El Nogal'
];

const UserProfile = () => {
  // 💡 MOCK DATA: Datos iniciales simulados para que el perfil se muestre inmediatamente
  const [userData, setUserData] = useState({
    nombre: 'Juan',
    apellido: 'Pérez',
    email: 'juan.perez@test.com',
    telefono: '3101234567',
    direccion: 'Calle 10 # 5-20',
    vereda: 'Vereda San Rafael',
    password: '', // La contraseña debe ser vacía por seguridad
    foto: null, // Guarda el objeto File o el string 'REMOVE'
  });
  
  const [preview, setPreview] = useState(null); // URL local o URL remota simulada
  const [currentVideo, setCurrentVideo] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);
  const [saved, setSaved] = useState(false);
  const [editable, setEditable] = useState(false);
  const [loading, setLoading] = useState(false); // 💡 FALSE: No hay carga de API
  const [processing, setProcessing] = useState(false); // Estado de envío

  const fileInputRef = useRef(null);

  /* Fondo con cambio de video */
  useEffect(() => {
    const interval = setInterval(() => setCurrentVideo(v => (v + 1) % videos.length), 10000);
    return () => clearInterval(interval);
  }, []);

  // 🚫 REMOVED: fetchUserData function (no more API)
  // 🚫 REMOVED: useEffect for fetchUserData

  const handleChange = e => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      setUserData(prev => ({ ...prev, foto: file })); // Guardar el objeto File para el envío
    }
  };

  const handleRemovePhoto = () => {
    setPreview(null);
    setUserData(prev => ({ ...prev, foto: 'REMOVE' })); // Flag para eliminar
  };

  // 💡 SIMULACIÓN: Lógica para "guardar" los cambios (sin API)
  const handleUpdateProfile = () => {
    setShowConfirm(false);
    setProcessing(true);

    // Aquí iría la lógica de API, pero la reemplazamos por un temporizador de simulación
    setTimeout(() => {
        console.log("Simulación de guardado. Datos actualizados localmente:", userData);
        
        // Limpiamos la contraseña después de la "actualización" simulada
        setUserData(prev => ({ ...prev, password: '' })); 
        
        setSaved(true);
        setEditable(false);
        setProcessing(false);
        setTimeout(() => setSaved(false), 3000);
        
    }, 1500); // Esperar 1.5 segundos para simular la petición
  };

  const enableEdit = () => {
    setEditable(true);
  };

  if (loading) {
    return (
        <div className="video-profile-wrapper">
             <div className="loading-container" style={{ color: 'white', fontSize: '24px' }}>Cargando perfil...</div>
        </div>
    );
  }

  return (
    <MainLayout>
    <div className="video-profile-wrapper">
      <video key={currentVideo} autoPlay loop muted className="background-video">
        <source src={videos[currentVideo]} type="video/mp4" />
        Tu navegador no soporta el video.
      </video>

      {/* Modal de confirmación */}
      {showConfirm && (
        <div className="modal-overlay" onClick={() => setShowConfirm(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>¿Estás seguro de guardar los cambios?</h3>
            <div className="modal-buttons">
              <button className="btn-confirm" onClick={handleUpdateProfile} disabled={processing}>
                {processing ? 'Guardando...' : 'Sí, guardar'}
              </button>
              <button className="btn-cancel" onClick={() => setShowConfirm(false)} disabled={processing}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {/* Mensaje de éxito */}
      {saved && (
        <div className="toast-success">
          <FaCheckCircle /> Cambios guardados
        </div>
      )}

      <div className="profile-container">
        <h2>Perfil de Usuario</h2>
        <p>Administra tu información personal</p>

        <form className="profile-form" onSubmit={e => e.preventDefault()}>
          <label>Nombre</label>
          <input type="text" name="nombre" value={userData.nombre} onChange={handleChange} disabled={!editable || processing} />

          <label>Apellido</label>
          <input type="text" name="apellido" value={userData.apellido} onChange={handleChange} disabled={!editable || processing} />

          <label>Correo</label>
          <input type="email" name="email" value={userData.email} disabled /> 

          <label>Teléfono</label>
          <input type="tel" name="telefono" value={userData.telefono} onChange={handleChange} disabled={!editable || processing} />

          <label>Dirección</label>
          <input type="text" name="direccion" value={userData.direccion} onChange={handleChange} disabled={!editable || processing} />

          <label>Vereda</label>
          <select name="vereda" value={userData.vereda} onChange={handleChange} disabled={!editable || processing}>
            <option value="">Selecciona una vereda</option>
            {veredasDisponibles.map(v => <option key={v} value={v}>{v}</option>)}
          </select>

          <label>Contraseña</label>
          <input 
            type="password" 
            name="password" 
            placeholder="******" 
            value={userData.password} 
            onChange={handleChange} 
            disabled={!editable || processing} 
          />

          {/* FOTO */}
          <label>Foto de perfil</label>
          <div className="photo-section">
            <div className="circle-image" onClick={() => editable && !processing && fileInputRef.current?.click()}>
              {preview ? <img src={preview} alt="perfil" /> : <FaUser className="default-user-icon" />}
            </div>

            <div className="photo-actions">
              <div onClick={() => editable && !processing && document.getElementById('cameraInput').click()}>
                <FaCamera /><span>Cámara</span>
              </div>
              <div onClick={() => editable && !processing && document.getElementById('galleryInput').click()}>
                <FaImage /><span>Galería</span>
              </div>
              <div onClick={() => editable && !processing && handleRemovePhoto()}>
                <FaTrash /><span>Eliminar</span>
              </div>
            </div>

            <input type="file" id="cameraInput" accept="image/*" capture="environment" style={{ display: 'none' }} onChange={handleImageChange} disabled={processing} />
            <input type="file" id="galleryInput" accept="image/*" style={{ display: 'none' }} onChange={handleImageChange} ref={fileInputRef} disabled={processing} />
          </div>

          {editable ? (
            <button type="button" onClick={() => setShowConfirm(true)} disabled={processing}>
                {processing ? 'Procesando...' : 'Guardar cambios'}
            </button>
          ) : (
            <button type="button" onClick={enableEdit} disabled={processing}>Editar información</button>
          )}
        </form>
      </div>
    </div>
    </MainLayout>
  );
};

export default UserProfile;