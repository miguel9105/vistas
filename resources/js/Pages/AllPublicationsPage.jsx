import React, { useState, useEffect } from 'react';
import MainLayout from '../Layouts/MainLayout';
// 💡 Importamos 'router' para la redirección
import { Head, Link, router } from '@inertiajs/react'; 
import { FaImage, FaSearch, FaTimesCircle, FaEye, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';

export const AllPublicationsPage = ({ auth }) => {
    
    // --- LÓGICA DE DATOS Y ESTADO ---

    const [filters, setFilters] = useState({
        title: '',
        type: '',
        severity: '',
        location: ''
    });

    const [appliedFilters, setAppliedFilters] = useState({
        title: '',
        type: '',
        severity: '',
        location: ''
    });

    const [publications, setPublications] = useState([]);
    // 💡 Estado de carga iniciado en true
    const [loading, setLoading] = useState(true); 

    // 💡 LÓGICA DE VALIDACIÓN DE SESIÓN (NUEVO useEffect)
    useEffect(() => {
        const isAuthenticated = localStorage.getItem('is_authenticated');
        
        if (isAuthenticated !== 'true') {
            // Si no está autenticado, redirigir al login
            router.visit('/login'); 
        } else {
            // Si está autenticado, permitir la carga
            setLoading(false);
        }
    }, []); // Se ejecuta solo al montar el componente

    // Se modifica el useEffect original para que solo cargue publicaciones después de la validación
    useEffect(() => {
        if (!loading) { // Solo carga si ya se validó la sesión y loading es false
            const saved = localStorage.getItem('publications');
            if (saved) {
                setPublications(JSON.parse(saved));
            }
        }
    }, [loading]); // Depende del estado de loading

    const handleFilterInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
    };

    const applyFilters = () => { setAppliedFilters(filters); };
    const clearFilters = () => {
    const cleared = { title: '', type: '', severity: '', location: '' };
    setFilters(cleared);
    setAppliedFilters(cleared);
    };

    const filteredPublications = publications.filter((pub) => {
    return (
        pub.title.toLowerCase().includes(appliedFilters.title.toLowerCase()) &&
        (appliedFilters.type === '' || pub.type.toLowerCase() === appliedFilters.type.toLowerCase()) &&
        (appliedFilters.severity === '' || pub.severity.toLowerCase() === appliedFilters.severity.toLowerCase()) &&
        pub.location.toLowerCase().includes(appliedFilters.location.toLowerCase())
    );
    });

    const getSeverityColor = (severity) => {
        switch(severity.toLowerCase()) {
            case 'baja': return 'text-green-500 bg-green-100 dark:bg-green-900/50';
            case 'media': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/50';
            case 'alta': return 'text-red-600 bg-red-100 dark:bg-red-900/50';
            default: return 'text-gray-500 bg-gray-100 dark:bg-gray-700/50';
        }
    };
    
    // 💡 Renderizado condicional: Muestra el mensaje de carga mientras se valida la sesión.
    if (loading) {
        return (
            <MainLayout>
                <div className="w-full h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 text-xl font-semibold dark:text-white">
                    Cargando y verificando sesión. Por favor espere...
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <Head title="Publicaciones" />
            
            <div className="container mx-auto px-4 py-8">
                {/* Título de la sección */}
                <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white border-b border-red-500 pb-2">
                    Reportes y Publicaciones de la Comunidad
                </h1>

                {/* Contenido de la página (Filtros y Lista) */}
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Panel de Filtros */}
                    <aside className="lg:w-1/4 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl h-fit sticky top-4">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Filtros</h2>

                        {/* Campo Título */}
                        <div className="mb-4">
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Título/Palabra Clave</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    value={filters.title}
                                    onChange={handleFilterInputChange}
                                    className="w-full p-2 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-red-500 focus:border-red-500 transition duration-150"
                                    placeholder="Buscar por título..."
                                />
                                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            </div>
                        </div>

                        {/* Campo Tipo */}
                        <div className="mb-4">
                            <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tipo de Evento</label>
                            <select
                                name="type"
                                id="type"
                                value={filters.type}
                                onChange={handleFilterInputChange}
                                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-red-500 focus:border-red-500 transition duration-150"
                            >
                                <option value="">Todos</option>
                                <option value="incendio">Incendio</option>
                                <option value="derrumbe">Derrumbe</option>
                                <option value="inundacion">Inundación</option>
                                <option value="accidente">Accidente</option>
                                <option value="otro">Otro</option>
                            </select>
                        </div>

                        {/* Campo Severidad */}
                        <div className="mb-4">
                            <label htmlFor="severity" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Severidad</label>
                            <select
                                name="severity"
                                id="severity"
                                value={filters.severity}
                                onChange={handleFilterInputChange}
                                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-red-500 focus:border-red-500 transition duration-150"
                            >
                                <option value="">Todas</option>
                                <option value="baja">Baja</option>
                                <option value="media">Media</option>
                                <option value="alta">Alta</option>
                            </select>
                        </div>

                        {/* Campo Ubicación */}
                        <div className="mb-6">
                            <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Ubicación</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    name="location"
                                    id="location"
                                    value={filters.location}
                                    onChange={handleFilterInputChange}
                                    className="w-full p-2 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-red-500 focus:border-red-500 transition duration-150"
                                    placeholder="Ej: Silvía o Popayán"
                                />
                                <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            </div>
                        </div>

                        {/* Botones de acción */}
                        <div className="flex justify-between space-x-2">
                            <button
                                onClick={applyFilters}
                                className="flex-1 py-2 px-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-200 shadow-md"
                            >
                                Aplicar Filtros
                            </button>
                            <button
                                onClick={clearFilters}
                                className="flex-1 py-2 px-4 bg-gray-400 text-white font-semibold rounded-lg hover:bg-gray-500 transition duration-200 shadow-md flex items-center justify-center"
                            >
                                <FaTimesCircle className="mr-1" /> Limpiar
                            </button>
                        </div>
                    </aside>

                    {/* Lista de Publicaciones */}
                    <div className="lg:w-3/4">
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            
                            {filteredPublications.map((pub) => (
                                <div key={pub.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition duration-300">
                                    {/* Imagen de la Publicación */}
                                    <div className="h-48 overflow-hidden">
                                        <img 
                                            src={pub.image || '/images/default-pub.jpg'} 
                                            alt={pub.title} 
                                            className="w-full h-full object-cover" 
                                        />
                                    </div>

                                    <div className="p-4">
                                        {/* Título y Severidad */}
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-2">{pub.title}</h3>
                                            <span 
                                                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getSeverityColor(pub.severity)}`}
                                            >
                                                {pub.severity.toUpperCase()}
                                            </span>
                                        </div>

                                        {/* Detalles */}
                                        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-3">{pub.description}</p>
                                        
                                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-4 space-y-1">
                                            <div className="flex items-center"><FaMapMarkerAlt className="mr-1" /> {pub.location}</div>
                                            <div className="flex items-center"><FaCalendarAlt className="mr-1" /> {new Date(pub.date).toLocaleDateString()}</div>
                                        </div>

                                        {/* Botón de Ver Detalles */}
                                        <Link 
                                            href={`/publicaciones/${pub.id}`} 
                                            className="flex items-center justify-center w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300 text-sm shadow-md"
                                        >
                                            <FaEye className="mr-2" /> Ver Detalles
                                        </Link>
                                    </div>
                                </div>
                            ))} {/* FIN DEL MAPEO */}
                            
                            {/* Mensajes de estado */}
                            {filteredPublications.length === 0 && publications.length > 0 && (
                                <p className="col-span-full text-center text-white/70 text-lg py-10 bg-gray-800 rounded-xl shadow-xl">
                                    No hay reportes que coincidan con los filtros aplicados.
                                </p>
                            )}
                            {publications.length === 0 && !loading && (
                                <p className="col-span-full text-center text-white/70 text-lg py-10 bg-gray-800 rounded-xl shadow-xl">
                                    Aún no hay reportes publicados.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default AllPublicationsPage;