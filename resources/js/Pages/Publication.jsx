import React, { useState, useEffect } from 'react';
import MainLayout from '../Layouts/MainLayout';
import { FaEdit, FaTrash, FaImage, FaSearch, FaTimesCircle } from 'react-icons/fa';

export const PublicationPage = () => {
  // Estado para el formulario de publicación/edición
  const [form, setForm] = useState({
    title: '',
    type: '',
    severity: '',
    location: '',
    description: '',
    image: null, // Objeto File real
    imagePreview: null, // Data URL para la previsualización
  });

  // Estado para los inputs del filtro
  const [filters, setFilters] = useState({
    title: '',
    type: '',
    severity: '',
    location: ''
  });

  // Estado para los filtros aplicados (usados para el filtrado real)
  const [appliedFilters, setAppliedFilters] = useState({
    title: '',
    type: '',
    severity: '',
    location: ''
  });

  const [publications, setPublications] = useState([]);
  const [message, setMessage] = useState('');
  const [editingId, setEditingId] = useState(null);

  // Carga las publicaciones al montar el componente
  useEffect(() => {
    const saved = localStorage.getItem('publications');
    if (saved) {
      setPublications(JSON.parse(saved));
    }
  }, []);

  // Handler genérico para los campos de texto y select
  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });
  };

  // Handler para la selección de archivos
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

  // Handler de envío del formulario
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
              ...pub, // Mantenemos propiedades como ID y Date
              title: form.title,
              type: form.type,
              severity: form.severity,
              location: form.location,
              description: form.description,
              // Usamos el nuevo preview o mantenemos el existente si no se subió uno nuevo
              imagePreview: form.imagePreview || pub.imagePreview,
              // Nota: El objeto File (form.image) no se guarda en localStorage, solo el preview (base64)
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
        // El imagePreview ya está en el estado 'form' gracias a handleFileChange
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

  const handleEdit = (pub) => {
    // Para editar, cargamos los datos y el preview actual
    setForm({
      title: pub.title,
      type: pub.type,
      severity: pub.severity,
      location: pub.location,
      description: pub.description,
      image: null, // No podemos cargar el File real, solo el preview
      imagePreview: pub.imagePreview, 
    });
    setEditingId(pub.id);
    // Desplazarse al inicio para editar fácilmente
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

  // Filtrado de publicaciones basado en appliedFilters
  const filteredPublications = publications.filter((pub) => {
    return (
      pub.title.toLowerCase().includes(appliedFilters.title.toLowerCase()) &&
      // Para los selects, solo filtramos si hay un valor aplicado
      (appliedFilters.type === '' || pub.type.toLowerCase() === appliedFilters.type.toLowerCase()) &&
      (appliedFilters.severity === '' || pub.severity.toLowerCase() === appliedFilters.severity.toLowerCase()) &&
      pub.location.toLowerCase().includes(appliedFilters.location.toLowerCase())
    );
  });

  // Función para determinar el color de gravedad
  const getSeverityColor = (severity) => {
    switch(severity.toLowerCase()) {
      case 'baja': return 'text-green-500 bg-green-100 dark:bg-green-900/50';
      case 'media': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/50';
      case 'alta': 
      case 'critica': return 'text-red-600 bg-red-100 dark:bg-red-900/50';
      default: return 'text-gray-500 bg-gray-100 dark:bg-gray-700/50';
    }
  };

  return (
    <MainLayout>
      {/* Contenedor principal con fondo gradiente */}
      <div className="min-h-screen bg-gradient-to-br from-[#3B5B8A] to-black p-4 sm:p-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Título de la página */}
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white text-center mb-10 pt-10 shadow-lg">
            {editingId ? 'Editar Reporte de Emergencia' : 'Publicar Nuevo Reporte'}
          </h1>
          
          {/* Mensaje de estado */}
          {message && (
            <div className={`p-4 rounded-xl text-center font-bold mb-6 ${message.includes('éxito') || message.includes('actualizada') ? 'bg-green-500 text-white' : 'bg-yellow-500 text-gray-900'}`}>
              {message}
            </div>
          )}

          <div className="flex flex-wrap -mx-4">
            
            {/* Columna del Formulario (8/12) */}
            <div className="w-full lg:w-2/3 px-4">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 mb-8 transition-colors duration-500">
                <form onSubmit={handleSubmit}>
                  
                  {/* Fila 1: Título */}
                  <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Título del Reporte *</label>
                    <input type="text" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white transition" id="title" value={form.title} onChange={handleChange} required />
                  </div>

                  {/* Fila 2: Tipo y Gravedad */}
                  <div className="flex flex-wrap -mx-2 mb-4">
                    <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
                      <label htmlFor="type" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Tipo de Desastre *</label>
                      <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white appearance-none transition" id="type" value={form.type} onChange={handleChange} required>
                        <option value="">Seleccione...</option>
                        <option value="Inundacion">Inundación</option>
                        <option value="Incendio">Incendio</option>
                        <option value="Derrumbe">Derrumbe/Deslizamiento</option>
                        <option value="Terremoto">Terremoto</option>
                        <option value="Otro">Otro</option>
                      </select>
                    </div>
                    <div className="w-full md:w-1/2 px-2">
                      <label htmlFor="severity" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Gravedad *</label>
                      <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white appearance-none transition" id="severity" value={form.severity} onChange={handleChange} required>
                        <option value="">Seleccione...</option>
                        <option value="Baja">Baja</option>
                        <option value="Media">Media</option>
                        <option value="Alta">Alta</option>
                        <option value="Critica">Crítica</option>
                      </select>
                    </div>
                  </div>

                  {/* Fila 3: Ubicación */}
                  <div className="mb-4">
                    <label htmlFor="location" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Ubicación / Dirección *</label>
                    <input type="text" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white transition" id="location" value={form.location} onChange={handleChange} placeholder="Ej: Calle 10 # 5-20, barrio Centro" required />
                  </div>

                  {/* Fila 4: Descripción */}
                  <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Descripción Detallada *</label>
                    <textarea className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white transition" id="description" rows="4" value={form.description} onChange={handleChange} required></textarea>
                  </div>

                  {/* Fila 5: Imagen */}
                  <div className="mb-6">
                    <label htmlFor="image" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Adjuntar Evidencia (Foto/Video) (Opcional)</label>
                    <input type="file" className="w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 dark:file:bg-gray-600 dark:file:text-white" id="image" onChange={handleFileChange} accept="image/*" />
                  </div>
                  
                  {/* Botones de acción */}
                  <div className="flex justify-end space-x-4">
                    {editingId && (
                      <button type="button" className="px-6 py-2 rounded-full font-bold text-gray-700 bg-gray-300 hover:bg-gray-400 transition duration-300 shadow-md" onClick={() => setEditingId(null)}>
                        CANCELAR EDICIÓN
                      </button>
                    )}
                    <button type="submit" className="px-6 py-2 rounded-full font-bold text-white transition duration-300 bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 shadow-lg shadow-green-500/50">
                      {editingId ? 'GUARDAR CAMBIOS' : 'PUBLICAR REPORTE'}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Columna de Previsualización (4/12) */}
            <div className="w-full lg:w-1/3 px-4">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 transition-colors duration-500 sticky top-10">
                <h5 className="text-xl font-bold text-[#3B5B8A] dark:text-gray-200 mb-4">Previsualización</h5>
                <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700">
                  {form.imagePreview ? (
                    <img
                      src={form.imagePreview}
                      className="w-full h-48 object-cover"
                      alt="Previsualización de imagen"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <FaImage size={40} className="text-gray-400 dark:text-gray-500" />
                    </div>
                  )}
                  <div className="p-4">
                    <h5 className="text-lg font-bold text-[#3B5B8A] dark:text-gray-100 mb-1">{form.title || 'Título del Reporte'}</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{form.description || 'Descripción breve...'}</p>
                    <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${getSeverityColor(form.severity)}`}>
                        {form.severity || 'Gravedad'}
                    </span>
                    <small className="block text-xs text-gray-500 dark:text-gray-400 mt-2">
                      {form.type || 'Tipo'} | {form.location || 'Ubicación'}
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Sección de Filtros y Publicaciones */}
          <h2 className="text-3xl font-bold text-white text-center my-8">Publicaciones Anteriores ({publications.length})</h2>
          
          {/* Tarjeta de Filtros */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-10 transition-colors duration-500">
            <h5 className="text-xl font-bold text-[#3B5B8A] dark:text-gray-200 mb-4 flex items-center">
                <FaSearch className="mr-2" /> Filtros de búsqueda
            </h5>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <input
                type="text"
                name="title"
                placeholder="Título"
                value={filters.title}
                onChange={handleFilterInputChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
              <select
                name="type"
                value={filters.type}
                onChange={handleFilterInputChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white appearance-none"
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
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white appearance-none"
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
                placeholder="Ubicación"
                value={filters.location}
                onChange={handleFilterInputChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div className="mt-4 flex space-x-3">
              <button 
                className="flex-1 md:flex-none px-6 py-2 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition duration-300 shadow-md" 
                onClick={applyFilters}
              >
                <FaSearch className="inline mr-1" /> Filtrar
              </button>
              <button 
                className="flex-1 md:flex-none px-6 py-2 bg-gray-400 text-white font-semibold rounded-full hover:bg-gray-500 transition duration-300 shadow-md" 
                onClick={clearFilters}
              >
                <FaTimesCircle className="inline mr-1" /> Limpiar filtros
              </button>
            </div>
          </div>

          {/* Lista de Publicaciones */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPublications.map((pub) => (
              <div key={pub.id} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-xl h-full flex flex-col transition-shadow duration-300 hover:shadow-2xl">
                
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
                  <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full mb-2 ${getSeverityColor(pub.severity)}`}>
                    {pub.severity}
                  </span>
                  <h5 className="text-xl font-bold text-[#3B5B8A] dark:text-gray-100 mb-2">{pub.title}</h5>
                  <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">{pub.description}</p>
                </div>
                
                {/* Pie de tarjeta */}
                <div className="p-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600 flex justify-between items-center">
                    <small className="text-xs text-gray-500 dark:text-gray-400">
                        {pub.type} | {pub.location} | {pub.date}
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
    </MainLayout>
  );
};

export default PublicationPage;