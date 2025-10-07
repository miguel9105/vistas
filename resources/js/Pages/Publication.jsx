import React, { useState, useEffect } from 'react';
import './Publication.css';

export const Publication = () => {
  const [form, setForm] = useState({
    title: '',
    type: '',
    severity: '',
    location: '',
    description: '',
    image: null,
  });

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
  const [message, setMessage] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('publications');
    if (saved) {
      setPublications(JSON.parse(saved));
    }
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, image: file });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title || !form.type || !form.severity || !form.location || !form.description) {
      setMessage('Por favor completa todos los campos obligatorios.');
      return;
    }

    if (editingId) {
      const updatedPublications = publications.map(pub =>
        pub.id === editingId
          ? {
              ...form,
              id: editingId,
              imagePreview: form.image ? URL.createObjectURL(form.image) : pub.imagePreview,
              date: pub.date
            }
          : pub
      );
      setPublications(updatedPublications);
      localStorage.setItem('publications', JSON.stringify(updatedPublications));
      setEditingId(null);
      setMessage('¡Publicación actualizada!');
    } else {
      const newPublication = {
        ...form,
        id: Date.now(),
        imagePreview: form.image ? URL.createObjectURL(form.image) : null,
        date: new Date().toLocaleDateString()
      };

      const updated = [newPublication, ...publications];
      setPublications(updated);
      localStorage.setItem('publications', JSON.stringify(updated));
      setMessage('¡Publicación guardada!');
    }

    setForm({ title: '', type: '', severity: '', location: '', description: '', image: null });
    setTimeout(() => setMessage(''), 3000);
  };

  const handleEdit = (pub) => {
    setForm({
      title: pub.title,
      type: pub.type,
      severity: pub.severity,
      location: pub.location,
      description: pub.description,
      image: null
    });
    setEditingId(pub.id);
    window.scrollTo(0, 0);
  };

  const handleDelete = (id) => {
    const filtered = publications.filter(pub => pub.id !== id);
    setPublications(filtered);
    localStorage.setItem('publications', JSON.stringify(filtered));
  };

  const handleFilterInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const applyFilters = () => {
    setAppliedFilters(filters);
  };

  const clearFilters = () => {
    setFilters({ title: '', type: '', severity: '', location: '' });
    setAppliedFilters({ title: '', type: '', severity: '', location: '' });
  };

  const filteredPublications = publications.filter((pub) => {
    return (
      pub.title.toLowerCase().includes(appliedFilters.title.toLowerCase()) &&
      pub.type.toLowerCase().includes(appliedFilters.type.toLowerCase()) &&
      pub.severity.toLowerCase().includes(appliedFilters.severity.toLowerCase()) &&
      pub.location.toLowerCase().includes(appliedFilters.location.toLowerCase())
    );
  });

  return (
    <div className="publication-form-container">
      <div className="container">
        <h1 className="page-title">{editingId ? 'Editar Publicación' : 'Nueva Publicación'}</h1>

        {/* FORMULARIO */}
        <div className="form-card mb-5">
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Título *</label>
                <input type="text" id="title" value={form.title} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Tipo *</label>
                <select id="type" value={form.type} onChange={handleChange}>
                  <option value="">Seleccionar</option>
                  <option value="inundacion">Inundación</option>
                  <option value="incendio">Incendio</option>
                  <option value="terremoto">Terremoto</option>
                  <option value="deslizamiento">Deslizamiento</option>
                  <option value="otro">Otro</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Severidad *</label>
                <select id="severity" value={form.severity} onChange={handleChange}>
                  <option value="">Seleccionar</option>
                  <option value="alta">Alta</option>
                  <option value="media">Media</option>
                  <option value="baja">Baja</option>
                </select>
              </div>
              <div className="form-group">
                <label>Ubicación *</label>
                <input type="text" id="location" value={form.location} onChange={handleChange} />
              </div>
            </div>

            <div className="form-group">
              <label>Descripción *</label>
              <textarea id="description" rows="4" value={form.description} onChange={handleChange}></textarea>
            </div>

            <div className="form-group">
              <label>Imagen (opcional)</label>
              <input type="file" id="image" accept="image/*" onChange={handleFileChange} />
            </div>

            {message && <div className="alert alert-info mt-2">{message}</div>}

            <div className="form-actions">
              <button type="reset" className="btn-secondary">Cancelar</button>
              <button type="submit" className="btn-primary">
                {editingId ? 'Actualizar' : 'Publicar'}
              </button>
            </div>
          </form>
        </div>

        {/* FILTROS */}
        <div className="card filter-card mb-5">
          <div className="card-body">
            <h4 className="mb-4">🔍 Filtros de búsqueda</h4>
            <div className="row g-3">
              <div className="col-md-3">
                <input
                  type="text"
                  name="title"
                  placeholder="Título"
                  value={filters.title}
                  onChange={handleFilterInputChange}
                  className="form-control"
                />
              </div>
              <div className="col-md-3">
                <select
                  name="type"
                  value={filters.type}
                  onChange={handleFilterInputChange}
                  className="form-control"
                >
                  <option value="">Tipo</option>
                  <option value="inundacion">Inundación</option>
                  <option value="incendio">Incendio</option>
                  <option value="terremoto">Terremoto</option>
                  <option value="deslizamiento">Deslizamiento</option>
                  <option value="otro">Otro</option>
                </select>
              </div>
              <div className="col-md-3">
                <select
                  name="severity"
                  value={filters.severity}
                  onChange={handleFilterInputChange}
                  className="form-control"
                >
                  <option value="">Severidad</option>
                  <option value="alta">Alta</option>
                  <option value="media">Media</option>
                  <option value="baja">Baja</option>
                </select>
              </div>
              <div className="col-md-3">
                <input
                  type="text"
                  name="location"
                  placeholder="Ubicación"
                  value={filters.location}
                  onChange={handleFilterInputChange}
                  className="form-control"
                />
              </div>
            </div>

            <div className="mt-3 d-flex gap-2">
              <button className="btn btn-primary" onClick={applyFilters}>Filtrar</button>
              <button className="btn btn-secondary" onClick={clearFilters}>Limpiar filtros</button>
            </div>
          </div>
        </div>

        {/* PUBLICACIONES */}
        <h2 className="text-white mb-4">📌 Publicaciones guardadas</h2>
        <div className="row g-4">
          {filteredPublications.map((pub) => (
            <div key={pub.id} className="col-md-4">
              <div className="card h-100 shadow-sm">
                {pub.imagePreview ? (
                  <img
                    src={pub.imagePreview}
                    className="card-img-top"
                    alt={pub.title}
                    style={{ height: 200, objectFit: 'cover' }}
                  />
                ) : (
                  <div className="card-img-top bg-secondary d-flex align-items-center justify-content-center" style={{ height: 200 }}>
                    <i className="fas fa-image fa-3x text-white-50"></i>
                  </div>
                )}
                <div className="card-body">
                   <h5 className="card-title">{pub.title}</h5>
                   <p className="card-text">{pub.description}</p>
                   <small className="text-muted">
                      {pub.type} - {pub.severity} | {pub.location} | {pub.date}
                     </small>
                </div>
                <div className="card-footer d-flex justify-content-between">
                  <button className="btn btn-sm btn-warning" onClick={() => handleEdit(pub)}>Editar</button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(pub.id)}>Eliminar</button>
                </div>
              </div>
            </div>
          ))}
          {filteredPublications.length === 0 && (
            <p className="text-white-50">No hay publicaciones que coincidan.</p>
          )}
        </div>
      </div>
    </div>
  );
};
import React, { useState, useEffect } from 'react';
import MainLayout from '../Layouts/MainLayout';
import './Publication.css';

export const Publicar = () => {
  const [form, setForm] = useState({
    title: '',
    type: '',
    severity: '',
    location: '',
    description: '',
    image: null,
    imagePreview: null, // Para mostrar la imagen antes de subirla
  });

  const [filters, setFilters] = useState({
    title: '',
    type: '',
    severity: '',
    location: ''
  });

  const [publications, setPublications] = useState([]);
  const [message, setMessage] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    // Carga las publicaciones guardadas localmente (Simulación)
    const saved = localStorage.getItem('publications');
    if (saved) {
      setPublications(JSON.parse(saved));
    }
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();

    // En un proyecto real con Laravel/Inertia, aquí usarías Inertia.post o Inertia.put:
    // Inertia.post(route('publications.store'), form);

    const date = new Date().toLocaleString();
    
    if (editingId !== null) {
      // Editar
      const updatedPublications = publications.map(pub =>
        pub.id === editingId ? { ...pub, ...form, date } : pub
      );
      setPublications(updatedPublications);
      setMessage('Publicación actualizada con éxito.');
      setEditingId(null);
    } else {
      // Crear nueva
      const newPublication = { ...form, id: Date.now(), date };
      setPublications([...publications, newPublication]);
      setMessage('Publicación enviada con éxito.');
    }

    // Guardar en localStorage (simulación)
    localStorage.setItem('publications', JSON.stringify(publications));

    // Resetear formulario
    setForm({ title: '', type: '', severity: '', location: '', description: '', image: null, imagePreview: null });
    setTimeout(() => setMessage(''), 3000);
  };

  const handleDelete = (id) => {
    const updated = publications.filter(pub => pub.id !== id);
    setPublications(updated);
    localStorage.setItem('publications', JSON.stringify(updated));
    setMessage('Publicación eliminada.');
  };

  const handleEdit = (pub) => {
    setForm({
      title: pub.title,
      type: pub.type,
      severity: pub.severity,
      location: pub.location,
      description: pub.description,
      image: pub.image,
      imagePreview: pub.imagePreview // Si estás usando la URL del dataURL para el preview
    });
    setEditingId(pub.id);
  };

  const handleFilterChange = (e) => {
    const { id, value } = e.target;
    setFilters({ ...filters, [id]: value });
  };
  
  const handleApplyFilters = () => {
    // Lógica para aplicar los filtros (actualizar el estado que usa la lista)
    const applied = { ...filters };
    // Guardar el estado de los filtros aplicados para usarlos en el renderizado
    setPublications(JSON.parse(localStorage.getItem('publications') || '[]').filter(pub => {
        return Object.keys(applied).every(key => {
            if (!applied[key]) return true; // Ignorar filtros vacíos
            return pub[key].toLowerCase().includes(applied[key].toLowerCase());
        });
    }));
  };
  

  return (
    <MainLayout>
        <div className="publication-form-container">
            <div className="container">
                <h1 className="page-title">{editingId ? 'Editar Reporte de Emergencia' : 'Publicar Nuevo Reporte'}</h1>

                {message && <div className="alert-message">{message}</div>}

                <div className="row">
                    {/* Columna del formulario (8) */}
                    <div className="col-lg-8">
                        <div className="form-card">
                            <form onSubmit={handleSubmit}>
                                {/* ... (resto del formulario, ajustado con id y handleChange) ... */}
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Título del Reporte</label>
                                    <input type="text" className="form-control" id="title" value={form.title} onChange={handleChange} required />
                                </div>

                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label htmlFor="type" className="form-label">Tipo de Desastre</label>
                                        <select className="form-select" id="type" value={form.type} onChange={handleChange} required>
                                            <option value="">Seleccione...</option>
                                            <option value="Inundacion">Inundación</option>
                                            <option value="Incendio">Incendio</option>
                                            <option value="Derrumbe">Derrumbe/Deslizamiento</option>
                                            <option value="Otro">Otro</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="severity" className="form-label">Gravedad</label>
                                        <select className="form-select" id="severity" value={form.severity} onChange={handleChange} required>
                                            <option value="">Seleccione...</option>
                                            <option value="Baja">Baja</option>
                                            <option value="Media">Media</option>
                                            <option value="Alta">Alta</option>
                                            <option value="Critica">Crítica</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="location" className="form-label">Ubicación / Dirección</label>
                                    <input type="text" className="form-control" id="location" value={form.location} onChange={handleChange} placeholder="Ej: Calle 10 # 5-20, barrio Centro" required />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Descripción Detallada</label>
                                    <textarea className="form-control" id="description" rows="4" value={form.description} onChange={handleChange} required></textarea>
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="image" className="form-label">Adjuntar Evidencia (Foto/Video)</label>
                                    <input type="file" className="form-control" id="image" onChange={handleFileChange} />
                                </div>

                                <button type="submit" className="btn btn-submit">
                                    {editingId ? 'GUARDAR CAMBIOS' : 'PUBLICAR REPORTE'}
                                </button>
                                {editingId && (
                                    <button type="button" className="btn btn-cancel" onClick={() => setEditingId(null)}>
                                        CANCELAR EDICIÓN
                                    </button>
                                )}
                            </form>
                        </div>
                    </div>
                    {/* Columna de filtros y preview (4) */}
                    <div className="col-lg-4">
                        <div className="form-card">
                            <h5 className="mb-3">Previsualización</h5>
                            <div className="card shadow">
                                {form.imagePreview ? (
                                    <img
                                        src={form.imagePreview}
                                        className="card-img-top"
                                        alt="Previsualización"
                                        style={{ height: 200, objectFit: 'cover' }}
                                    />
                                ) : (
                                    <div className="card-img-top bg-secondary d-flex align-items-center justify-content-center" style={{ height: 200 }}>
                                        <i className="fas fa-image fa-3x text-white-50"></i>
                                    </div>
                                )}
                                <div className="card-body">
                                    <h5 className="card-title">{form.title || 'Título del Reporte'}</h5>
                                    <p className="card-text">{form.description || 'Descripción breve...'}</p>
                                    <small className="text-muted">
                                        {form.type || 'Tipo'} - {form.severity || 'Gravedad'} | {form.location || 'Ubicación'}
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sección de Publicaciones y Filtros */}
                <h2 className="text-center text-white mb-4">Publicaciones Anteriores ({publications.length})</h2>
                
                <div className="form-card filter-card mb-4">
                    <h5 className="mb-3">Buscar y Filtrar Reportes</h5>
                    <div className="row">
                        <div className="col-md-4 mb-3">
                            <input type="text" className="form-control" id="title" placeholder="Buscar por título" value={filters.title} onChange={handleFilterChange} />
                        </div>
                        <div className="col-md-3 mb-3">
                            <select className="form-select" id="type" value={filters.type} onChange={handleFilterChange}>
                                <option value="">Todos los Tipos</option>
                                <option value="Inundacion">Inundación</option>
                                <option value="Incendio">Incendio</option>
                                {/* ... otros tipos */}
                            </select>
                        </div>
                        <div className="col-md-3 mb-3">
                            <select className="form-select" id="severity" value={filters.severity} onChange={handleFilterChange}>
                                <option value="">Toda Gravedad</option>
                                <option value="Baja">Baja</option>
                                <option value="Alta">Alta</option>
                                {/* ... otras gravedades */}
                            </select>
                        </div>
                        <div className="col-md-2 mb-3">
                            <button type="button" className="btn btn-filter" onClick={handleApplyFilters}>Aplicar</button>
                        </div>
                    </div>
                </div>


                {/* Lista de Publicaciones */}
                <div className="row">
                    {publications.map((pub) => (
                        <div className="col-lg-4 col-md-6 mb-4" key={pub.id}>
                            <div className="card shadow">
                                {pub.imagePreview ? (
                                    <img
                                        src={pub.imagePreview}
                                        className="card-img-top"
                                        alt={pub.title}
                                        style={{ height: 200, objectFit: 'cover' }}
                                    />
                                ) : (
                                    <div className="card-img-top bg-secondary d-flex align-items-center justify-content-center" style={{ height: 200 }}>
                                        <i className="fas fa-image fa-3x text-white-50"></i>
                                    </div>
                                )}
                                <div className="card-body">
                                   <h5 className="card-title">{pub.title}</h5>
                                   <p className="card-text">{pub.description}</p>
                                   <small className="text-muted">
                                      {pub.type} - {pub.severity} | {pub.location} | {pub.date}
                                     </small>
                                </div>
                                <div className="card-footer d-flex justify-content-between">
                                  <button className="btn btn-sm btn-warning" onClick={() => handleEdit(pub)}>Editar</button>
                                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(pub.id)}>Eliminar</button>
                                </div>
                              </div>
                        </div>
                    ))}
                    {publications.length === 0 && (
                        <p className="text-white-50">No hay publicaciones disponibles.</p>
                    )}
                </div>
            </div>
        </div>
    </MainLayout>
  );
};

export default Publication;