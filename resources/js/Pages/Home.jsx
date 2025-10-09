import React from 'react';
import MainLayout from '../Layouts/MainLayout'; // Assuming this is correct for your Laravel/Inertia setup
import { Link } from '@inertiajs/react'; // ✅ Using Inertia's Link
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Home.css';

// RUTAS DE IMÁGENES (Ajustadas a la estructura de Laravel 'public/images/')
// Nota: En Inertia/Laravel, las rutas se consideran relativas a la carpeta 'public'.
// Las imágenes específicas de "tipos de desastres" y "entidades" se han remapeado a la estructura de assets.

// Carrusel Principal (Usamos las rutas genéricas del primer archivo para simplicidad)
const carrusel1 = '/images/carrusel1.jpg';
const carrusel2 = '/images/carrusel2.jpg';
const carrusel3 = '/images/carrusel3.jpg';
const carrusel4 = '/images/ungrd.png'; // Nuevo, asumiendo que lo tienes.

const qrCode = '/images/qr-code.png';

// Imágenes de iconos y entidades (Asumimos que están en public/images/ o las has movido allí)
const derrumbe = '/images/derrumbe.png';
const incendio = '/images/incendio.png';
const tormenta = '/images/tormenta.png';
const inundacion = '/images/inundacion.png';
const bomberos = '/images/bomberos.jpg';
const hospital = '/images/hospital.jpg';
const defensa = '/images/defensacivil.jpg';

const Home = () => {
  // Nota: En un proyecto Laravel/Inertia, la navegación para un CTA directo
  // se maneja mejor con el componente <Link> de Inertia o un redireccionamiento del backend.
  // La lógica de 'useNavigate' con 'state' se omitirá aquí para mantener la estructura Inertia/Laravel simple,
  // y se reemplazará por un Link directo a /chat.

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    arrows: true,
    fade: true, // Propiedad agregada del segundo código
  };

  const carouselImages = [
    { id: 1, src: carrusel1, alt: "Equipos de rescate", caption: "Respuesta inmediata ante emergencias" },
    { id: 2, src: carrusel2, alt: "Defensa civil", caption: "Coordinación profesional en situaciones críticas" },
    { id: 3, src: carrusel3, alt: "Ayuda humanitaria", caption: "Asistencia integral para afectados" },
    { id: 4, src: carrusel4, alt: "Prevención", caption: "Sistema de alertas tempranas" }
  ];

  return (
    <MainLayout>
      <div className="home-container">
        {/* Sección Hero */}
        <section className="hero-section">
          <div className="hero-content">
            <p className="intro-subtitle">BIENVENIDOS A DESAS3</p>
            <h1 className="intro-title">
              SISTEMA INTEGRAL PARA LA GESTIÓN DE DESASTRES NATURALES
            </h1>
            <p className="intro-text">
              Plataforma tecnológica que monitorea, analiza y coordina respuestas ante emergencias naturales, salvando vidas y protegiendo comunidades.
            </p>
            <div className="hero-buttons">
              {/* Usar Link de Inertia */}
              {/* Modificamos el botón de emergencia para usar Link con una ruta a /chat que manejará el reporte */}
              <Link href="/chat?chat=emergencia-general" className="btn-emergency">
                REPORTAR EMERGENCIA
              </Link>
              <button className="btn-project">CONOCE EL PROYECTO</button>
            </div>
          </div>
        </section>

        {/* --- */}
        {/* Sección de tipos de desastres */}
        <section className="disaster-report-section">
          <div className="section-container">
            <div className="report-header">
              <h2 className="report-main-title">¿VES UNA EMERGENCIA?</h2>
              <p className="report-subtitle">¡REPÓRTALA AHORA! Tu alerta puede salvar vidas</p>
              <div className="urgency-indicator">
                <span className="pulse-dot"></span>
                <span className="urgency-text">CADA SEGUNDO CUENTA</span>
              </div>
            </div>

            <div className="disaster-report-grid">
              {/* Derrumbe → Defensa Civil */}
              <Link href="/chat?chat=defensa-civil" className="report-button derrumbe-btn">
                <div className="report-icon-container">
                  <img src={derrumbe} alt="Derrumbe" className="report-icon" />
                </div>
                <div className="report-content">
                  <h3 className="report-name">REPORTAR DERRUMBE</h3>
                  <p className="report-action">Zonas de riesgo • Deslizamientos</p>
                  <div className="report-arrow">→</div>
                </div>
              </Link>

              {/* Incendio → Bomberos */}
              <Link href="/chat?chat=bomberos" className="report-button incendio-btn">
                <div className="report-icon-container">
                  <img src={incendio} alt="Incendio" className="report-icon" />
                </div>
                <div className="report-content">
                  <h3 className="report-name">REPORTAR INCENDIO</h3>
                  <p className="report-action">Fuego • Humo • Estructuras</p>
                  <div className="report-arrow">→</div>
                </div>
              </Link>

              {/* Tormenta → Defensa Civil */}
              <Link href="/chat?chat=defensa-civil" className="report-button tormenta-btn">
                <div className="report-icon-container">
                  <img src={tormenta} alt="Tormenta" className="report-icon" />
                </div>
                <div className="report-content">
                  <h3 className="report-name">REPORTAR TORMENTA</h3>
                  <p className="report-action">Clima severo • Granizo • Vientos</p>
                  <div className="report-arrow">→</div>
                </div>
              </Link>

              {/* Inundación → UDGR */}
              <Link href="/chat?chat=udgr" className="report-button inundacion-btn">
                <div className="report-icon-container">
                  <img src={inundacion} alt="Inundación" className="report-icon" />
                </div>
                <div className="report-content">
                  <h3 className="report-name">REPORTAR INUNDACIÓN</h3>
                  <p className="report-action">Ríos • Calles • Desbordamientos</p>
                  <div className="report-arrow">→</div>
                </div>
              </Link>
            </div>

            <div className="emergency-footer">
              <p className="emergency-note">
                <strong>🚨 EMERGENCIA MÉDICA:</strong> Marca <strong>123</strong> inmediatamente
              </p>
            </div>
          </div>
        </section>

        {/* --- */}
        {/* Sección de entidades colaboradoras */}
        <section className="entities-section">
          <div className="section-container">
            <h2 className="section-title">COLABORAMOS CON LAS PRINCIPALES ENTIDADES DE RESPUESTA</h2>
            <div className="entity-logos">
              <div className="entity-item">
                <div className="entity-logo-container">
                  <img src={bomberos} alt="Bomberos" className="entity-logo" />
                </div>
                <div className="entity-content">
                  <h3 className="entity-name">Cuerpo de Bomberos</h3>
                  <p className="entity-description">Entidad especializada en respuesta a incendios y rescates</p>
                  <Link href="/bomberos" className="entity-link">Más información</Link>
                </div>
              </div>

              <div className="entity-item">
                <div className="entity-logo-container">
                  <img src={hospital} alt="Hospital" className="entity-logo" />
                </div>
                <div className="entity-content">
                  <h3 className="entity-name">Hospitales Locales</h3>
                  <p className="entity-description">Atención médica de emergencia y primeros auxilios</p>
                  <Link href="/hospitales" className="entity-link">Más información</Link>
                </div>
              </div>

              <div className="entity-item">
                <div className="entity-logo-container">
                  <img src={defensa} alt="Defensa Civil" className="entity-logo" />
                </div>
                <div className="entity-content">
                  <h3 className="entity-name">Defensa Civil</h3>
                  <p className="entity-description">Coordinación en emergencias y desastres naturales</p>
                  <Link href="/defensa-civil" className="entity-link">Más información</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- */}
        {/* Carrusel de situaciones (Sistema en acción) */}
        <section className="carousel-section">
          <h2 className="section-title">NUESTRO SISTEMA EN ACCIÓN</h2>
          <div className="carousel-container">
            <Slider {...carouselSettings}>
              {carouselImages.map((image) => (
                <div key={image.id} className="carousel-slide">
                  <img src={image.src} alt={image.alt} />
                  <div className="carousel-caption">
                    <h3>{image.caption}</h3>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </section>

        {/* --- */}
        {/* Sección de descarga de app */}
        <section className="download-app-section">
          <div className="section-container download-container">
            <div className="qr-code-container">
              <div className="qr-code-card">
                <img src={qrCode} alt="Código para descargar la app" className="qr-code-image" />
                <p className="scan-text">ESCANEA Y DESCARGA LA APP</p>
                <div className="app-badges">
                  {/* Se mantienen los enlaces directos a las imágenes de los badges */}
                  <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" className="app-badge" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="app-badge" />
                </div>
              </div>
            </div>

            <div className="download-text">
              <h2 className="download-title">LLÉVANOS CONTIGO A DONDE VAYAS</h2>
              <p className="download-description">
                La aplicación móvil DESAS3 te mantiene informado y protegido con:
              </p>
              <ul className="features-list">
                <li><i className="fas fa-bell"></i> Alertas en tiempo real en tu zona</li>
                <li><i className="fas fa-map-marked-alt"></i> Mapas interactivos de riesgo</li>
                <li><i className="fas fa-first-aid"></i> Guías de primeros auxilios</li>
                <li><i className="fas fa-phone-alt"></i> Contactos de emergencia directos</li>
                <li><i className="fas fa-exclamation-triangle"></i> Sistema de reporte rápido</li>
              </ul>
            </div>
          </div>
        </section>

        {/* --- */}
        {/* Llamado a la acción final */}
        <section className="cta-section">
          <h2>¿LISTO PARA PROTEGERTE Y PROTEGER A LOS TUYOS?</h2>
          <p>Regístrate ahora y forma parte de nuestra comunidad de prevención</p>
          {/* Se usa Link de Inertia para la navegación */}
          <Link href="/registro" className="btn-register">REGISTRARME GRATIS</Link>
        </section>
      </div>
    </MainLayout>
  );
};

export default Home;