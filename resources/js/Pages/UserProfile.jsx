/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react'; 
import './UserProfile.css';
import MainLayout from '../Layouts/MainLayout';
// Importamos FaLock para el botón de cambio de contraseña
import { FaUser, FaCheckCircle, FaLock } from 'react-icons/fa'; 
import axios from 'axios';
import { router } from '@inertiajs/react';

// URL de tu API externa en Railway
const API_BASE_URL = 'https://api10desas-production-bdfa.up.railway.app/api/v1';

// ... [Variables de videos y veredas] ...
const videos = [
    '/videos/derrumbe.mp4',
    '/videos/incendio.mp4',
    '/videos/tormenta.mp4'
];

const veredasDisponibles = [
    'Vereda San Rafael', 'Vereda San Diego', 'Vereda El Triunfo', 'Vereda La Primavera',
    'Vereda El Rosal', 'Vereda La Esperanza', 'Vereda Los Pinos', 'Vereda San Antonio',
    'Vereda El Paraíso', 'Vereda El Carmen', 'Vereda El Roble', 'Vereda La Palma',
    'Vereda Santa Rosa', 'Vereda El Placer', 'Vereda La Cumbre', 'Vereda Las Delicias',
    'Vereda La Floresta', 'Vereda Los Ángeles', 'Vereda La Unión', 'Vereda Monteverde',
    'Vereda Alto Bonito', 'Vereda El Edén', 'Vereda Campo Hermoso', 'Vereda La Loma',
    'Vereda Las Brisas', 'Vereda El Jardín',
];

const UserProfile = () => {
    // ESTADOS PRINCIPALES
    const [currentVideo, setCurrentVideo] = useState(0);
    const [editable, setEditable] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [message, setMessage] = useState(null); 
    const [errors, setErrors] = useState({});
    const [showConfirm, setShowConfirm] = useState(false);
    
    // ESTADO DE CARGA PARA LA VALIDACIÓN DE SESIÓN
    const [loading, setLoading] = useState(true); 

    // ESTADO DEL FORMULARIO (Datos de Registro)
    const [form, setForm] = useState({
        firstname: '',
        lastname: '',
        email: '',
        location: '',
    });
    
    // Función auxiliar para obtener datos de autenticación del localStorage
    const getAuthData = () => {
        const authToken = localStorage.getItem('auth_token');
        const userDataString = localStorage.getItem('user_data');
        
        if (!authToken || !userDataString) {
            return null;
        }

        try {
            const userData = JSON.parse(userDataString);
            return { authToken, userId: userData.id };
        } catch (e) {
            console.error("Error al parsear user_data:", e);
            return null;
        }
    };
    
    // 1. LÓGICA DE VERIFICACIÓN DE SESIÓN SOLICITADA
    useEffect(() => {
        const isAuthenticated = localStorage.getItem('is_authenticated');
        
        if (isAuthenticated !== 'true') {
            router.visit('/login'); // Redirige si no está autenticado
        } else {
            setLoading(false); // Permite la renderización y la carga de datos
        }
    }, []); 

    // 2. EFECTO PARA CARGAR DATOS DEL PERFIL (Depende de que 'loading' sea false)
    useEffect(() => {
        if (loading === false) { 
            const authData = getAuthData();
            
            if (!authData) {
                setMessage({ type: 'error', text: 'Datos de sesión incompletos. Reinicia sesión.' });
                setProcessing(true); 
                setTimeout(() => router.visit('/login'), 3000); 
                return;
            }

            const fetchUserData = async () => {
                setProcessing(true);
                try {
                    // Petición GET para obtener los datos del usuario actual
                    const response = await axios.get(`${API_BASE_URL}/users/${authData.userId}`, {
                        headers: {
                            'Authorization': `Bearer ${authData.authToken}`,
                            'Accept': 'application/json',
                        }
                    });

                    const userData = response.data.data; 
                    
                    // Cargar los datos de registro en el formulario
                    setForm({
                        firstname: userData.firstname || '',
                        lastname: userData.lastname || '',
                        email: userData.email || '',
                        location: userData.location || '',
                    });
                    
                } catch (error) {
                    console.error('Error al cargar datos del usuario:', error);
                    setMessage({ type: 'error', text: 'Error al cargar el perfil. Vuelve a iniciar sesión.' });
                    if (error.response && error.response.status === 401) {
                        setTimeout(() => router.visit('/login'), 2000); 
                    }
                } finally {
                    setProcessing(false);
                }
            };

            fetchUserData();
        }
        
        // Efecto para cambiar el video de fondo
        const interval = setInterval(() => {
            setCurrentVideo((prev) => (prev + 1) % videos.length);
        }, 10000);
        
        return () => clearInterval(interval);
        
    }, [loading]); 
    
    // 💡 3. FUNCIÓN CORREGIDA PARA ACTUALIZAR PERFIL (USANDO AXIOS.PUT)
    const handleUpdateProfile = async () => {
        const authData = getAuthData();
        if (!authData) return;

        setProcessing(true);
        setErrors({});
        setMessage(null);
        setShowConfirm(false);

        // Se quita '_method: PUT' ya que usaremos axios.put
        const updateData = {
            firstname: form.firstname,
            lastname: form.lastname,
            email: form.email,
            location: form.location,
        };

        try {
            // 🚨 CAMBIO CLAVE: Usar axios.put para la actualización RESTful
            await axios.put(`${API_BASE_URL}/users/${authData.userId}`, updateData, {
                headers: {
                    'Authorization': `Bearer ${authData.authToken}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json', 
                }
            });

            setMessage({ type: 'success', text: '¡Perfil actualizado con éxito! Se actualizará la página en 3 segundos.' });
            setEditable(false); 
            setTimeout(() => {
                 window.location.reload(); 
            }, 3000);

        } catch (error) {
            setProcessing(false);
            
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors);
                setMessage({ type: 'error', text: 'Hay errores de validación. Revisa los campos.' });
            } else {
                console.error('Error al actualizar el perfil:', error.response || error);
                setMessage({ type: 'error', text: 'Error en la conexión o el servidor. (Verifica el token o el ID del usuario).' });
            }
        }
    };
    
    // --- MANEJADORES ---
    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const enableEdit = () => {
        setEditable(true);
        setMessage(null);
    };

    const handlePasswordChange = () => {
        setMessage({ type: 'info', text: 'Serás redirigido para cambiar tu contraseña.' });
        setTimeout(() => {
             router.visit('/change-password'); 
        }, 2000);
    };

    const currentVideoSrc = videos[currentVideo];

    // Muestra pantalla de carga mientras se verifica la sesión
    if (loading) {
        return (
            <MainLayout>
                 <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'white', fontSize: '1.2rem' }}>
                    Verificando sesión. Por favor espere...
                </div>
            </MainLayout>
        );
    }


    return (
        <MainLayout>
            {/* Video de fondo */}
            <div className="video-background">
                <video key={currentVideoSrc} autoPlay loop muted className="video-element">
                    <source src={currentVideoSrc} type="video/mp4" />
                    Tu navegador no soporta videos.
                </video>
                <div className="overlay" />
            </div>

            <div className="profile-container">
                <div className="profile-card">
                    <h2>Mi Perfil</h2>
                    
                    {/* Mensajes de estado (Éxito/Error) */}
                    {message && (
                        <div className={`message ${message.type}`}>
                            {message.type === 'success' && <FaCheckCircle className="mr-2" />}
                            {message.text}
                        </div>
                    )}

                    <div className="profile-image-static">
                        <FaUser className="default-user-icon-large" />
                    </div>
                    
                    <form className="profile-form" onSubmit={(e) => { e.preventDefault(); setShowConfirm(true); }}>
                        
                        {/* ----------------- CAMPOS DE REGISTRO MODIFICABLES ----------------- */}

                        {/* Nombre (firstname) */}
                        <label htmlFor="firstname">Nombre(s)</label>
                        <input
                            type="text"
                            id="firstname"
                            name="firstname"
                            value={form.firstname}
                            onChange={handleChange}
                            required
                            disabled={!editable || processing}
                        />
                        {errors.firstname && <div className="error">{errors.firstname}</div>}

                        {/* Apellidos (lastname) */}
                        <label htmlFor="lastname">Apellido(s)</label>
                        <input
                            type="text"
                            id="lastname"
                            name="lastname"
                            value={form.lastname}
                            onChange={handleChange}
                            required
                            disabled={!editable || processing}
                        />
                        {errors.lastname && <div className="error">{errors.lastname}</div>}

                        {/* Email (email) */}
                        <label htmlFor="email">Correo Electrónico</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            disabled={!editable || processing}
                        />
                        {errors.email && <div className="error">{errors.email}</div>}

                        {/* Ubicación (location) */}
                        <label htmlFor="location">Ubicación (Vereda/Sector)</label>
                        <select
                            id="location"
                            name="location"
                            value={form.location}
                            onChange={handleChange}
                            required
                            disabled={!editable || processing}
                        >
                            <option value="">Selecciona tu ubicación</option>
                            {veredasDisponibles.map((vereda) => (
                                <option key={vereda} value={vereda}>{vereda}</option>
                            ))}
                        </select>
                        {errors.location && <div className="error">{errors.location}</div>}
                        
                        
                        {/* Botón para cambiar contraseña */}
                        <button type="button" onClick={handlePasswordChange} disabled={processing} className="password-button">
                            <FaLock className="mr-2"/> Cambiar Contraseña
                        </button>
                        
                        {/* ----------------- BOTONES DE ACCIÓN ----------------- */}
                        
                        {editable ? (
                            <>
                            {showConfirm ? (
                                <div className="confirm-container">
                                    <p>¿Estás seguro de guardar los cambios?</p>
                                    <div className="confirm-buttons">
                                        <button type="button" onClick={handleUpdateProfile} disabled={processing}>
                                            {processing ? 'Guardando...' : 'Sí, Guardar'}
                                        </button>
                                        <button type="button" onClick={() => setShowConfirm(false)} disabled={processing} className="cancel">
                                            Cancelar
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <button type="submit" disabled={processing || message?.type === 'success'}>
                                    {processing ? 'Procesando...' : 'Guardar cambios'}
                                </button>
                            )}
                            </>
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