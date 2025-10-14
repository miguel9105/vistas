import React, { useState, useEffect } from 'react';
import MainLayout from '../Layouts/MainLayout';
import { Head, Link } from '@inertiajs/react'; 
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
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const saved = localStorage.getItem('publications');
      if (saved) {
        setPublications(JSON.parse(saved));
      }
      setLoading(false);
    }, []);

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
            case 'alta': 
            case 'critica': return 'text-red-600 bg-red-100 dark:bg-red-900/50';
            default: return 'text-gray-500 bg-gray-100 dark:bg-gray-700/50';
        }
    };
    
    const inputClass = "w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white appearance-none";

    // --- RENDERIZADO VISUAL ---

    return (
        <MainLayout auth={auth}>
            <Head title="Buzón de Reportes" />

            <div className="min-h-screen bg-gradient-to-br from-[#3B5B8A] to-black p-4 sm:p-8 pt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-white text-center mb-10 shadow-lg">
                        Buzón de Reportes de Emergencia 
                    </h1>
                    
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-10 transition-colors duration-500 border border-gray-100 dark:border-gray-700">
                        <h5 className="text-xl font-bold text-[#3B5B8A] dark:text-gray-200 mb-4 flex items-center border-b pb-2 border-gray-200 dark:border-gray-700">
                            <FaSearch className="mr-2 text-[#3B5B8A] dark:text-gray-200" /> Filtros de búsqueda
                        </h5>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <input
                                type="text"
                                name="title"
                                placeholder="Buscar por Título..."
                                value={filters.title}
                                onChange={handleFilterInputChange}
                                className={inputClass}
                            />
                            <select
                                name="type"
                                value={filters.type}
                                onChange={handleFilterInputChange}
                                className={inputClass}
                            >
                                <option value="">Todos los Tipos</option>
                                <option value="Inundacion">Inundación</option>
                                <option value="Incendio">Incendio</option>
                                <option value="Derrumbe">Derrumbe/Deslizamiento</option>
                                <option value="Terremoto">Terremoto</option>
                                <option value="Otro">Otro</option>
                            </select>
                            <select
                                name="severity"
                                value={filters.severity}
                                onChange={handleFilterInputChange}
                                className={inputClass}
                            >
                                <option value="">Toda Gravedad</option>
                                <option value="Baja">Baja</option>
                                <option value="Media">Media</option>
                                <option value="Alta">Alta</option>
                                <option value="Critica">Crítica</option>
                            </select>
                            <input
                                type="text"
                                name="location"
                                placeholder="Buscar por Ubicación..."
                                value={filters.location}
                                onChange={handleFilterInputChange}
                                className={inputClass}
                            />
                        </div>

                        <div className="mt-6 flex space-x-3 justify-end">
                            <button 
                                className="px-6 py-2 bg-gray-400 text-white font-semibold rounded-full hover:bg-gray-500 transition duration-300 shadow-md flex items-center" 
                                onClick={clearFilters}
                            >
                                <FaTimesCircle className="inline mr-2" /> Limpiar filtros
                            </button>
                            <button 
                                className="px-6 py-2 bg-[#3B5B8A] text-white font-semibold rounded-full hover:bg-blue-800 transition duration-300 shadow-md flex items-center" 
                                onClick={applyFilters}
                            >
                                <FaSearch className="inline mr-2" /> Aplicar Filtros
                            </button>
                        </div>
                    </div>

                    {/* --- Sección de Publicaciones --- */}
                    <h2 className="text-3xl font-bold text-white text-center my-8">
                        Reportes Recientes ({publications.length})
                    </h2>
                    
                    {loading ? (
                        <p className="text-center text-xl text-gray-300 py-10">Cargando reportes...</p>
                    ) : (
                        // CLAVE: El inicio de este div es la parte 'else' del condicional de loading
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            
                            {/* INICIO DEL MAPEO DONDE TE DABA ERROR */}
                            {filteredPublications.map((pub) => (
                                <div key={pub.id} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-xl h-full flex flex-col transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-gray-700/50 border border-gray-200 dark:border-gray-700">
                                    
                                    {/* Imagen / Placeholder */}
                                    {pub.imagePreview ? (
                                        <img
                                            src={pub.imagePreview}
                                            className="w-full h-48 object-cover"
                                            alt={pub.title}
                                        />
                                    ) : (
                                        <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                            <FaImage size={40} className="text-gray-400 dark:text-gray-500" />
                                        </div>
                                    )}
                                    
                                    {/* Contenido de la tarjeta */}
                                    <div className="p-4 flex-grow">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${getSeverityColor(pub.severity)}`}>
                                                {pub.severity}
                                            </span>
                                        </div>
                                        
                                        <h5 className="text-lg font-bold text-[#3B5B8A] dark:text-gray-100 mb-2 line-clamp-2">{pub.title}</h5>
                                        
                                        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-3">{pub.description}</p>
                                        
                                        <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                                            <p className="flex items-center"><FaMapMarkerAlt className="mr-2 text-gray-500 dark:text-gray-400" /> {pub.location}</p>
                                            <p className="flex items-center"><FaCalendarAlt className="mr-2 text-gray-500 dark:text-gray-400" /> {pub.date}</p>
                                        </div>
                                    </div>
                                    
                                    {/* Pie de tarjeta (Acción) */}
                                    <div className="p-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
                                        <Link 
                                            href={`/reporte/${pub.id}`} 
                                            className="w-full inline-flex justify-center items-center px-4 py-2 bg-red-600 text-white font-semibold rounded-full hover:bg-red-700 transition duration-300 text-sm shadow-md"
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
                    )} {/* CLAVE: Cierre del bloque de renderizado condicional de loading */}
                </div>
            </div>
        </MainLayout>
    );
};

export default AllPublicationsPage;