import React from 'react';
import MainLayout from '../Layouts/MainLayout';
import { Link } from '@inertiajs/react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../css/app.css'; // Asegura la carga de Tailwind

// 🚨 SOLUCIÓN A ERRORES DE IMAGEN: Usar RUTAS ABSOLUTAS desde la carpeta public/images
const carrusel1 = '/images/bomberos.jpg'; 
const carrusel2 = '/images/defensacivil.jpg'; 
const carrusel3 = '/images/hospital.jpg';
const qrCode = '/images/qr-code.png';

// Imágenes de iconos de desastre
const derrumbe = '/images/derrumbe.png'; 
const incendio = '/images/incendio.png';
const tormenta = '/images/tormenta.png';
const inundacion = '/images/inundacion.png';

const EntityItem = ({ name, description, link }) => (
    // ... (El componente de Entidad se mantiene igual)
    <div className="flex flex-col items-center max-w-xs p-5 rounded-xl transition duration-300 hover:shadow-lg hover:shadow-gray-200">
        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4 border-2 border-gray-300">
            <i className="fas fa-building text-3xl text-blue-800"></i>
        </div>
        <h3 className="text-lg font-bold text-blue-900 mb-1">{name}</h3>
        <p className="text-sm text-gray-600 mb-2 text-center">{description}</p>
        <a href={link} className="text-red-600 font-semibold text-sm hover:text-red-700">Visitar sitio</a>
    </div>
);


const Home = () => {
    
    // ... (Configuración del Carrusel se mantiene igual)
    const carouselSettings = { 
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
    };

    const carouselImages = [
        { src: carrusel1, caption: 'Nuestros bomberos listos para la acción.' },
        { src: carrusel2, caption: 'La defensa civil monitoreando áreas de riesgo.' },
        { src: carrusel3, caption: 'Personal de salud en alerta ante emergencias.' },
    ];


    return (
        <MainLayout>
            <div className="w-full overflow-x-hidden">
                
                {/* 1. SECCIÓN HERO / INFO PRINCIPAL (Fondo Azul) */}
                <section className="bg-blue-900 py-20 text-center text-white">
                    <div className="max-w-7xl mx-auto px-5">
                        <p className="text-sm font-semibold uppercase text-red-600 tracking-wider">
                            BIENVENIDOS A DESAS3
                        </p>
                        <h1 className="text-5xl lg:text-6xl font-extrabold mt-4 mb-5 max-w-3xl mx-auto">
                            SISTEMA INTEGRAL PARA LA GESTIÓN DE DESASTRES NATURALES
                        </h1>
                        <p className="text-xl text-blue-300 mb-10 max-w-2xl mx-auto">
                            Plataforma tecnológica que monitorea, analiza y coordina respuestas ante emergencias naturales, salvando vidas y protegiendo comunidades.
                        </p>
                        <div className="flex justify-center space-x-5">
                            <Link 
                                href="/chat?reporte=emergencia-general" 
                                className="px-8 py-4 text-lg font-bold rounded-lg transition duration-300 no-underline 
                                           bg-gradient-to-r from-red-600 to-red-700 text-white shadow-xl shadow-red-500/50 hover:from-red-700 hover:to-red-800 uppercase"
                            >
                                REPORTAR EMERGENCIA
                            </Link>
                            <button 
                                className="px-8 py-4 text-lg font-bold rounded-lg transition duration-300 
                                           bg-transparent text-white border-2 border-white hover:bg-white hover:text-blue-900 uppercase"
                            >
                                CONOCE EL PROYECTO
                            </button>
                        </div>
                    </div>
                </section>

                {/* 2. SECCIÓN DE TIPOS DE DESASTRES (Estructura de Ícono y Texto Separados) */}
                <section className="py-10 md:py-16 bg-gray-50 text-center">
                    <div className="max-w-xl mx-auto px-5">
                        
                        {/* Botón Principal de Emergencia */}
                        <div className="mb-4">
                             <Link href="/chat?reporte=emergencia-inmediata" 
                                className="bg-red-600 text-white px-8 py-4 text-xl font-bold rounded-md block w-full max-w-xs mx-auto transition duration-300 hover:bg-red-700 no-underline uppercase shadow-lg shadow-red-500/50"
                            >
                                INFORMAR EMERGENCIA
                            </Link>
                            <p className="text-sm text-gray-500 mt-2 mb-8">Toca aquí si necesitas ayuda inmediata</p>
                        </div>
                        
                        {/* Título de Selección */}
                        <div className="mb-10">
                            <h2 className="text-2xl font-bold text-gray-800">¿Qué tipo de emergencia estás presentando?</h2>
                        </div>
                        

                        {/* Grid de Tarjetas de Emergencia */}
                        <div className="grid grid-cols-2 gap-5 max-w-md mx-auto">
                            
                            {/* Tormenta */}
                            <Link href="/chat?reporte=tormenta" className="flex flex-col items-center text-center p-2 transition duration-200 hover:scale-[1.03] no-underline group">
                                {/* 🚨 CONTENEDOR BLANCO DEL ÍCONO */}
                                <div className="w-24 h-24 bg-white rounded-xl shadow-md border border-gray-200 flex items-center justify-center mb-3 group-hover:shadow-lg group-hover:border-red-400 transition duration-300">
                                    <img 
                                        src={tormenta} 
                                        alt="Tormenta" 
                                        className="w-12 h-12 object-contain filter-red-icon" 
                                    />
                                </div>
                                {/* 🚨 TEXTO FUERA DEL RECUADRO BLANCO */}
                                <h3 className="text-base font-bold text-gray-800 m-0 group-hover:text-red-600 transition duration-300">Tormenta</h3>
                                <p className="text-xs text-gray-500 m-0 leading-tight">Lluvia fuerte y vientos intensos</p>
                            </Link>
                            
                            {/* Incendio */}
                            <Link href="/chat?reporte=incendio" className="flex flex-col items-center text-center p-2 transition duration-200 hover:scale-[1.03] no-underline group">
                                <div className="w-24 h-24 bg-white rounded-xl shadow-md border border-gray-200 flex items-center justify-center mb-3 group-hover:shadow-lg group-hover:border-red-400 transition duration-300">
                                    <img 
                                        src={incendio} 
                                        alt="Incendio" 
                                        className="w-12 h-12 object-contain filter-red-icon"
                                    />
                                </div>
                                <h3 className="text-base font-bold text-gray-800 m-0 group-hover:text-red-600 transition duration-300">Incendio</h3>
                                <p className="text-xs text-gray-500 m-0 leading-tight">Fuego en vivienda, bosque o área urbana</p>
                            </Link>

                            {/* Inundación */}
                            <Link href="/chat?reporte=inundacion" className="flex flex-col items-center text-center p-2 transition duration-200 hover:scale-[1.03] no-underline group">
                                <div className="w-24 h-24 bg-white rounded-xl shadow-md border border-gray-200 flex items-center justify-center mb-3 group-hover:shadow-lg group-hover:border-red-400 transition duration-300">
                                    <img 
                                        src={inundacion} 
                                        alt="Inundación" 
                                        className="w-12 h-12 object-contain filter-red-icon"
                                    />
                                </div>
                                <h3 className="text-base font-bold text-gray-800 m-0 group-hover:text-red-600 transition duration-300">Inundación</h3>
                                <p className="text-xs text-gray-500 m-0 leading-tight">Crecimiento de ríos, calles con agua</p>
                            </Link>
                            
                            {/* Avalancha */}
                            <Link href="/chat?reporte=avalancha" className="flex flex-col items-center text-center p-2 transition duration-200 hover:scale-[1.03] no-underline group">
                                <div className="w-24 h-24 bg-white rounded-xl shadow-md border border-gray-200 flex items-center justify-center mb-3 group-hover:shadow-lg group-hover:border-red-400 transition duration-300">
                                    <img 
                                        src={derrumbe} 
                                        alt="Avalancha" 
                                        className="w-12 h-12 object-contain filter-red-icon"
                                    />
                                </div>
                                <h3 className="text-base font-bold text-gray-800 m-0 group-hover:text-red-600 transition duration-300">Avalancha</h3>
                                <p className="text-xs text-gray-500 m-0 leading-tight">Derrumbe de tierra o flujo de lodo</p>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* 3. SECCIÓN DE ENTIDADES COLABORADORAS (Se mantiene) */}
                <section className="py-16 bg-white">
                    <div className="max-w-7xl mx-auto px-5">
                        <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">Entidades Colaboradoras</h2>
                        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
                            <EntityItem name="Cruz Roja" description="Asistencia humanitaria y atención médica." link="#" />
                            <EntityItem name="Defensa Civil" description="Prevención, mitigación y atención de desastres." link="#" />
                            <EntityItem name="Bomberos" description="Respuesta inmediata a incendios y rescates." link="#" />
                            <EntityItem name="UNGRD" description="Coordinación nacional de gestión del riesgo." link="#" />
                        </div>
                    </div>
                </section>
                
                {/* 4. Carrusel de situaciones (Se mantiene) */}
                <section className="py-20 bg-gray-900 text-white">
                    <div className="max-w-7xl mx-auto px-5">
                        <h2 className="text-3xl font-bold text-center text-white mb-12">Situaciones Recientes</h2>
                        <div className="max-w-4xl mx-auto">
                            <Slider {...carouselSettings}>
                                {carouselImages.map((img, index) => (
                                    <div key={index} className="relative h-96 overflow-hidden rounded-xl">
                                        <img src={img.src} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
                                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-left">
                                            <h3 className="text-2xl font-bold m-0">{img.caption}</h3>
                                        </div>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    </div>
                </section>

                {/* 5. SECCIÓN DE DESCARGA DE APP (Se mantiene) */}
                <section className="py-20 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-5 flex flex-col lg:flex-row items-center gap-10">
                        <div className="lg:w-2/3">
                            <h2 className="text-3xl font-bold text-blue-900 mb-5">Descarga la App Móvil</h2>
                            <ul className="list-none p-0 mb-8 space-y-4">
                                <li className="text-lg text-gray-700 flex items-start">
                                    <i className="fas fa-check-circle text-red-600 text-xl mt-1 mr-4"></i> Reporte rápido de incidentes geolocalizados.
                                </li>
                                <li className="text-lg text-gray-700 flex items-start">
                                    <i className="fas fa-check-circle text-red-600 text-xl mt-1 mr-4"></i> Alertas y notificaciones de riesgo en tiempo real.
                                </li>
                                <li className="text-lg text-gray-700 flex items-start">
                                    <i className="fas fa-check-circle text-red-600 text-xl mt-1 mr-4"></i> Guías de prevención y contacto de emergencia.
                                </li>
                            </ul>
                            <div className="flex flex-wrap gap-4">
                                <img src="/images/google-play-badge.png" alt="Google Play" className="h-12 w-auto" />
                                <img src="/images/app-store-badge.svg" alt="App Store" className="h-12 w-auto" />
                            </div>
                        </div>
                        <div className="lg:w-1/3 flex justify-center mt-10 lg:mt-0">
                            <div className="bg-white p-6 rounded-xl shadow-2xl text-center max-w-xs">
                                <h4 className="text-xl font-semibold text-blue-900 mb-4">Escanea para Descargar</h4>
                                <img src={qrCode} alt="Código QR" className="w-44 h-44 mx-auto mb-4" />
                                <p className="text-gray-600 text-sm">Disponible para iOS y Android.</p>
                            </div>
                        </div>
                    </div>
                </section>
                
                {/* 6. CTA Section (Se mantiene) */}
                <section className="py-16 text-center text-white bg-gradient-to-r from-red-600 to-red-800">
                    <h2 className="text-3xl font-bold mb-3">¿Eres una entidad de respuesta? Regístrate</h2>
                    <Link 
                        href="/register" 
                        className="bg-white text-red-600 px-8 py-3 text-lg font-bold rounded-lg mt-5 inline-block transition duration-300 hover:bg-gray-100 no-underline uppercase shadow-lg shadow-black/30"
                    >
                        Registrarse Ahora
                    </Link>
                </section>

            </div>
        </MainLayout>
    );
};

export default Home;