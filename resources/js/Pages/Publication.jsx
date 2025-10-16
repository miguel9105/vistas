// resources/js/Pages/Publication.jsx

import React, { useState, useEffect } from 'react';
import MainLayout from '../Layouts/MainLayout';
import { router } from '@inertiajs/react'; 
import { FaEdit, FaTrash, FaImage, FaSearch, FaTimesCircle } from 'react-icons/fa';

export const PublicationPage = () => {
    // 💡 ESTADO DE CARGA/VALIDACIÓN
    const [loading, setLoading] = useState(true); // Inicializado en true

    // Estado para el formulario de publicación/edición
    const [form, setForm] = useState({ 
        title: '', 
        type: '', 
        severity: '', 
        location: '', 
        description: '', 
        image: null, 
        imagePreview: null 
    });
    const [filters, setFilters] = useState({ title: '', type: '', severity: '', location: '' });
    const [appliedFilters, setAppliedFilters] = useState({ title: '', type: '', severity: '', location: '' });
    const [publications, setPublications] = useState([]);
    const [message, setMessage] = useState('');
    const [editingId, setEditingId] = useState(null);

    // 💡 LÓGICA DE VERIFICACIÓN DE SESIÓN SOLICITADA
    useEffect(() => {
        const isAuthenticated = localStorage.getItem('is_authenticated');
        
        if (isAuthenticated !== 'true') {
            router.visit('/login'); // Redirige si no está autenticado
        } else {
            setLoading(false); // Permite la renderización del contenido
        }
    }, []);

    // Carga las publicaciones al montar el componente (solo si ya pasó la verificación)
    useEffect(() => {
        if (!loading) { 
            const saved = localStorage.getItem('publications');
            if (saved) {
                setPublications(JSON.parse(saved));
            }
        }
    }, [loading]); 

    // Handler genérico para los campos de texto y select
    const handleChange = (e) => {
        const { id, value } = e.target;
        setForm({ ...form, [id]: value });
    };
    
    // Handler para archivos
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setForm({ ...form, image: file, imagePreview: reader.result });
          };
          reader.readAsDataURL(file);
        } else {
          setForm({ ...form, image: null, imagePreview: null });
        }
    };

    // Handler de envío del formulario (Creación/Edición)
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!form.title || !form.type || !form.severity || !form.location || !form.description) {
            setMessage('Por favor completa todos los campos obligatorios.');
            setTimeout(() => setMessage(''), 3000);
            return;
        }

        let updatedPublications;

        if (editingId) {
            // Lógica de Edición
            updatedPublications = publications.map(pub =>
                pub.id === editingId
                ? {
                    ...pub, 
                    title: form.title,
                    type: form.type,
                    severity: form.severity,
                    location: form.location,
                    description: form.description,
                    imagePreview: form.imagePreview || pub.imagePreview,
                    }
                : pub
            );
            setEditingId(null);
            setMessage('Publicación actualizada con éxito.');
        } else {
            // Lógica de Creación
            const newPublication = {
                ...form,
                id: Date.now(),
                date: new Date().toLocaleDateString('es-ES'),
            };

            updatedPublications = [newPublication, ...publications];
            setMessage('Publicación enviada con éxito.');
        }

        setPublications(updatedPublications);
        localStorage.setItem('publications', JSON.stringify(updatedPublications));

        // Resetear formulario
        setForm({ title: '', type: '', severity: '', location: '', description: '', image: null, imagePreview: null });
        setTimeout(() => setMessage(''), 3000);
    };

    // Función para iniciar la edición
    const handleEdit = (pub) => {
        setForm({
            title: pub.title,
            type: pub.type,
            severity: pub.severity,
            location: pub.location,
            description: pub.description,
            image: null, 
            imagePreview: pub.imagePreview, 
        });
        setEditingId(pub.id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Función para eliminar
    const handleDelete = (id) => {
        if(window.confirm('¿Estás seguro de que quieres eliminar esta publicación?')) {
            const filtered = publications.filter(pub => pub.id !== id);
            setPublications(filtered);
            localStorage.setItem('publications', JSON.stringify(filtered));
            setMessage('Publicación eliminada.');
            setTimeout(() => setMessage(''), 3000);
        }
    };

    // --- Lógica de Filtros ---
    const handleFilterInputChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };
    const applyFilters = () => {
        setAppliedFilters(filters);
    };
    const clearFilters = () => {
        const cleared = { title: '', type: '', severity: '', location: '' };
        setFilters(cleared);
        setAppliedFilters(cleared);
    };

    // Helper para el color de severidad
    const getSeverityColor = (severity) => {
        switch (severity.toLowerCase()) {
            case 'alto':
                return 'bg-red-600';
            case 'medio':
                return 'bg-yellow-500';
            case 'bajo':
                return 'bg-green-500';
            default:
                return 'bg-gray-500';
        }
    };

    // Filtrado de publicaciones basado en appliedFilters
    const filteredPublications = publications.filter((pub) => {
        return (
            pub.title.toLowerCase().includes(appliedFilters.title.toLowerCase()) &&
            (appliedFilters.type === '' || pub.type.toLowerCase() === appliedFilters.type.toLowerCase()) &&
            (appliedFilters.severity === '' || pub.severity.toLowerCase() === appliedFilters.severity.toLowerCase()) &&
            pub.location.toLowerCase().includes(appliedFilters.location.toLowerCase())
        );
    });

    
    if (loading) {
        return (
            <MainLayout>
                <div className="w-full h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-xl font-semibold">
                    Verificando sesión. Por favor espere...
                </div>
            </MainLayout>
        );
    }

    // El contenido JSX completo del componente
    return (
        <MainLayout>
            <div className="publication-page-container min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 sm:p-8">
                <div className="max-w-7xl mx-auto">
                    
                    {/* Mensaje de estado */}
                    {message && (
                        <div className="fixed top-20 right-5 bg-green-500 text-white p-3 rounded-md shadow-lg z-50 transition-opacity duration-500">
                            {message}
                        </div>
                    )}

                    {/* Formulario de Publicación */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl mb-8">
                        <h2 className="text-3xl font-bold mb-6 text-indigo-600 dark:text-indigo-400">
                            {editingId ? 'Editar Publicación' : 'Crear Nueva Publicación'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input 
                                    type="text" 
                                    id="title" 
                                    placeholder="Título del Reporte (Ej: Incendio en El Roble)" 
                                    value={form.title}
                                    onChange={handleChange}
                                    className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 focus:ring-indigo-500 focus:border-indigo-500"
                                    required
                                />
                                <select 
                                    id="type" 
                                    value={form.type}
                                    onChange={handleChange}
                                    className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 focus:ring-indigo-500 focus:border-indigo-500"
                                    required
                                >
                                    <option value="">Selecciona Tipo de Evento</option>
                                    <option value="Incendio">Incendio</option>
                                    <option value="Inundación">Inundación</option>
                                    <option value="Derrumbe">Derrumbe</option>
                                    <option value="Accidente">Accidente</option>
                                    <option value="Otro">Otro</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <select 
                                    id="severity" 
                                    value={form.severity}
                                    onChange={handleChange}
                                    className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 focus:ring-indigo-500 focus:border-indigo-500"
                                    required
                                >
                                    <option value="">Nivel de Severidad</option>
                                    <option value="Alto">Alto (Riesgo de vida)</option>
                                    <option value="Medio">Medio (Daños materiales)</option>
                                    <option value="Bajo">Bajo (Alerta preventiva)</option>
                                </select>
                                <input 
                                    type="text" 
                                    id="location" 
                                    placeholder="Vereda o Ubicación específica" 
                                    value={form.location}
                                    onChange={handleChange}
                                    className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 focus:ring-indigo-500 focus:border-indigo-500"
                                    required
                                />
                            </div>

                            <textarea 
                                id="description" 
                                placeholder="Describe brevemente la situación..." 
                                rows="3"
                                value={form.description}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 focus:ring-indigo-500 focus:border-indigo-500"
                                required
                            />

                            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                                <label htmlFor="image-upload" className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 cursor-pointer p-3 border border-dashed border-indigo-400 dark:border-indigo-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-150">
                                    <FaImage size={20} />
                                    <span>{form.image ? 'Cambiar Imagen' : 'Subir Foto o Video'}</span>
                                </label>
                                <input 
                                    type="file" 
                                    id="image-upload" 
                                    accept="image/*,video/*" 
                                    onChange={handleFileChange} 
                                    className="hidden" 
                                />
                                {form.imagePreview && (
                                    <div className="relative w-24 h-24 rounded-lg overflow-hidden border-2 border-indigo-500">
                                        <img src={form.imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                        <button 
                                            type="button" 
                                            onClick={() => setForm({ ...form, image: null, imagePreview: null })}
                                            className="absolute top-0 right-0 p-1 bg-red-600 text-white rounded-bl-lg hover:bg-red-700"
                                        >
                                            <FaTimesCircle size={12} />
                                        </button>
                                    </div>
                                )}
                            </div>

                            <button 
                                type="submit"
                                className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-md transition duration-200 disabled:bg-indigo-400"
                            >
                                {editingId ? 'Actualizar Publicación' : 'Enviar Publicación'}
                            </button>
                            {editingId && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setEditingId(null);
                                        setForm({ title: '', type: '', severity: '', location: '', description: '', image: null, imagePreview: null });
                                    }}
                                    className="w-full py-3 px-4 bg-gray-500 hover:bg-gray-600 text-white font-bold rounded-lg shadow-md transition duration-200 mt-2"
                                >
                                    Cancelar Edición
                                </button>
                            )}
                        </form>
                    </div>


                    {/* Sección de Filtros */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl mb-8">
                        <h3 className="text-xl font-semibold mb-4 border-b pb-2">Filtrar Publicaciones</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                            <input
                                type="text"
                                name="title"
                                placeholder="Buscar por Título..."
                                value={filters.title}
                                onChange={handleFilterInputChange}
                                className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700"
                            />
                            <select
                                name="type"
                                value={filters.type}
                                onChange={handleFilterInputChange}
                                className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700"
                            >
                                <option value="">Tipo de Evento</option>
                                <option value="Incendio">Incendio</option>
                                <option value="Inundación">Inundación</option>
                                <option value="Derrumbe">Derrumbe</option>
                                <option value="Accidente">Accidente</option>
                                <option value="Otro">Otro</option>
                            </select>
                            <select
                                name="severity"
                                value={filters.severity}
                                onChange={handleFilterInputChange}
                                className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700"
                            >
                                <option value="">Severidad</option>
                                <option value="Alto">Alto</option>
                                <option value="Medio">Medio</option>
                                <option value="Bajo">Bajo</option>
                            </select>
                            <input
                                type="text"
                                name="location"
                                placeholder="Buscar por Vereda/Ubicación..."
                                value={filters.location}
                                onChange={handleFilterInputChange}
                                className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700"
                            />
                        </div>
                        <div className="flex space-x-2">
                            <button
                                onClick={applyFilters}
                                className="flex items-center space-x-2 py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition duration-200"
                            >
                                <FaSearch /> <span>Aplicar Filtros</span>
                            </button>
                            <button
                                onClick={clearFilters}
                                className="flex items-center space-x-2 py-2 px-4 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg transition duration-200"
                            >
                                <FaTimesCircle /> <span>Limpiar</span>
                            </button>
                        </div>
                    </div>


                    {/* Lista de Publicaciones */}
                    <div className="publications-list">
                        <h2 className="text-2xl font-bold mb-6">Publicaciones Recientes ({filteredPublications.length})</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredPublications.map((pub) => (
                                <div key={pub.id} className="bg-gray-200 dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-300 dark:border-gray-700 hover:shadow-2xl transition duration-300">
                                    {pub.imagePreview && (
                                        <div className="h-48 overflow-hidden">
                                            <img 
                                                src={pub.imagePreview} 
                                                alt={pub.title} 
                                                className="w-full h-full object-cover" 
                                            />
                                        </div>
                                    )}
                                    <div className="p-5">
                                        <div className="flex justify-between items-start mb-3">
                                            <span className={`text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full text-white ${getSeverityColor(pub.severity)}`}>
                                                {pub.severity}
                                            </span>
                                            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{pub.type}</span>
                                        </div>
                                        <h3 className="text-xl font-bold mb-2">{pub.title}</h3>
                                        <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">{pub.description}</p>
                                        
                                        <div className="flex justify-between items-center border-t border-gray-300 dark:border-gray-700 pt-3">
                                            <small className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                                                {pub.location} - {pub.date}
                                            </small>
                                            <div className="flex space-x-2">
                                                <button className="p-2 text-white bg-yellow-500 hover:bg-yellow-600 rounded-full transition duration-200" onClick={() => handleEdit(pub)}>
                                                <FaEdit size={14} />
                                                </button>
                                                <button className="p-2 text-white bg-red-600 hover:bg-red-700 rounded-full transition duration-200" onClick={() => handleDelete(pub.id)}>
                                                <FaTrash size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            
                            {/* Mensaje de no resultados */}
                            {filteredPublications.length === 0 && publications.length > 0 && (
                                <p className="col-span-full text-center text-white/70 text-lg py-10">
                                    No hay publicaciones que coincidan con los filtros aplicados.
                                </p>
                            )}
                            {publications.length === 0 && (
                                <p className="col-span-full text-center text-white/70 text-lg py-10">
                                    Aún no hay publicaciones guardadas localmente. ¡Sé el primero en reportar!
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default PublicationPage;