import React from 'react';
import MainLayout from '../Layouts/MainLayout';
import { Link } from '@inertiajs/react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Home.css';

// RUTAS DE IMÁGENES (Ajustar según donde las guardes)
// Usa rutas públicas si están en la carpeta 'public' de Laravel
const carrusel1 = '/images/carrusel1.jpg'; // Ejemplo
const carrusel2 = '/images/carrusel2.jpg';
const carrusel3 = '/images/carrusel3.jpg';
const qrCode = '/images/qr-code.png';

const Home = () => {
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
  };

  return (
    <MainLayout>
      <div className="home-container">
        {/* Sección Hero */}
        <section className="hero-section">
          <div className="section-container">
            <div className="hero-content">
              <h1 className="intro-title">Prepárate. Alerta. Responde.</h1>
              <p className="intro-subtitle">
                Sistema de gestión y comunicación inmediata para emergencias en Morales, Cauca.
              </p>
              <div className="hero-buttons">
                {/* Usar Link de Inertia */}
                <Link href="/login" className="btn-primary">INICIAR SESIÓN</Link>
                <Link href="/publicar" className="btn-secondary">REPORTAR EMERGENCIA</Link>
              </div>
            </div>
          </div>
        </section>

        {/* Sección de Noticias/Carrusel */}
        <section className="news-carousel">
          <div className="section-container">
            <h2 className="section-title">ÚLTIMAS ALERTAS EN TU ZONA</h2>
            <Slider {...carouselSettings}>
              <div><img src={carrusel1} alt="Alerta 1" className="carousel-image" /></div>
              <div><img src={carrusel2} alt="Alerta 2" className="carousel-image" /></div>
              <div><img src={carrusel3} alt="Alerta 3" className="carousel-image" /></div>
            </Slider>
          </div>
        </section>

        {/* Sección de Contactos de Emergencia */}
        <section className="emergency-contacts">
          <div className="section-container">
            <h2 className="section-title">CONTACTOS DE EMERGENCIA</h2>
            <div className="contact-grid">
                {/* Asume que las imágenes de los contactos están en public/images/ */}
                <div className="contact-card">
                  <img src="/images/bomberos.jpg" alt="Bomberos" />
                  <h3>Bomberos</h3>
                  <p>Línea: 119</p>
                  <a href="/chat?chat=bomberos" className="btn-chat">Chatear</a>
                </div>
                <div className="contact-card">
                  <img src="/images/hospital.jpg" alt="UDGR" />
                  <h3>UDGR</h3>
                  <p>Línea: 125</p>
                  <a href="/chat?chat=udgr" className="btn-chat">Chatear</a>
                </div>
                <div className="contact-card">
                  <img src="/images/defensacivil.jpg" alt="Defensa Civil" />
                  <h3>Defensa Civil</h3>
                  <p>Línea: 144</p>
                  <a href="/chat?chat=defensa-civil" className="btn-chat">Chatear</a>
                </div>
            </div>
          </div>
        </section>

        {/* Sección de Descarga */}
        <section className="download-app">
          <div className="section-container download-grid">
            <div className="download-qr">
              <img src={qrCode} alt="Código QR" className="qr-code-img" />
              <div className="app-badges">
                <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" className="app-badge" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="app-badge" />
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

        {/* Llamado a la acción final */}
        <section className="cta-section">
          <h2>¿LISTO PARA PROTEGERTE Y PROTEGER A LOS TUYOS?</h2>
          <p>Regístrate ahora y forma parte de nuestra comunidad de prevención</p>
          <Link href="/registro" className="btn-register">REGISTRARME GRATIS</Link>
        </section>
      </div>
    </MainLayout>
  );
};

export default Home;