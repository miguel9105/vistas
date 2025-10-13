import React from 'react';
import MainLayout from '../Layouts/MainLayout';
import { Link } from '@inertiajs/react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../css/app.css'; // Asegura la carga de Tailwind

// 🚨 RUTAS ABSOLUTAS para imágenes
const carrusel1 = '/images/bomberos.jpg'; 
const carrusel2 = '/images/defensacivil.jpg'; 
const carrusel3 = '/images/hospital.jpg';
const qrCode = '/images/qr-code.png';

// Imágenes de iconos de desastre
const derrumbe = '/images/derrumbe.png'; 
const incendio = '/images/incendio.png';
const tormenta = '/images/tormenta.png';
const inundacion = '/images/inundacion.png';

// Importar imágenes de entidades colaboradoras
const cruzRoja = '/images/cruzroja.png'; // Asumiendo que tienes una imagen llamada cruzroja.png
const defensaCivil = '/images/defensaCivil.png'; // Asumiendo un nombre de archivo para el logo
const bomberosLogo = '/images/bomberosLogo.png'; // Asumiendo un nombre de archivo para el logo
const ungrd = '/images/ungrd.png'; // Asumiendo que tienes una imagen llamada ungrd.png

// --- COMPONENTE AUXILIAR 1: EntityItem (MODIFICADO) ---
// Ahora acepta una prop 'imgSrc' para la imagen de la entidad
const EntityItem = ({ name, description, link, imgSrc }) => (
    <div className="flex flex-col items-center max-w-[200px] p-6 rounded-xl transition duration-300 bg-white shadow-sm hover:shadow-lg hover:shadow-red-100 border border-gray-100">
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 border-2 border-red-400/50 overflow-hidden">
            {/* Usamos la imagen proporcionada en imgSrc */}
            {imgSrc ? (
                <img src={imgSrc} alt={`${name} logo`} className="w-full h-full object-contain p-1" />
            ) : (
                // Fallback si no hay imagen (opcional, podrías eliminarlo si siempre habrá imagen)
                <i className="fas fa-building text-3xl text-red-600"></i>
            )}
        </div>
        <h3 className="text-lg font-bold text-blue-900 mb-1">{name}</h3>
        <p className="text-sm text-gray-600 mb-3 text-center line-clamp-2">{description}</p>
        <a href={link} className="text-red-600 font-semibold text-sm hover:text-red-700 transition duration-150 border-b border-red-600/0 hover:border-red-600">Visitar sitio</a>
    </div>
);
// --- FIN COMPONENTE AUXILIAR 1: EntityItem ---


// --- COMPONENTE AUXILIAR 2: DisasterCard (SE MANTIENE IGUAL) ---
const DisasterCard = ({ img, alt, title, subtitle, report }) => (
    <Link href={`/chat?reporte=${report}`} className="flex flex-col items-center text-center p-4 transition duration-200 hover:scale-[1.03] no-underline group relative bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl hover:border-red-400">
        <img 
            src={img} 
            alt={alt} 
            className="w-20 h-20 object-contain mb-4 transition duration-300 group-hover:scale-110" 
        />
        <h3 className="text-lg font-bold text-gray-800 mt-1 mb-1 group-hover:text-red-600 transition duration-300">{title}</h3>
        <p className="text-s text-gray-500 mb-2 leading-tight px-1">{subtitle}</p>
        <div className="text-s font-semibold text-red-500 py-1 transition duration-300 border-t border-gray-100 pt-3 w-full mt-2">REPORTAR</div>
    </Link>
);
// --- FIN COMPONENTE AUXILIAR 2: DisasterCard ---


const Home = () => {
    
    // Configuración del Carrusel se mantiene igual
    const carouselSettings = { 
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        appendDots: dots => (
            <div style={{ padding: "20px" }}>
                <ul style={{ margin: "0px" }}> {dots} </ul>
            </div>
        ),
        customPaging: i => (
            <div
                style={{
                    width: "10px",
                    height: "10px",
                    backgroundColor: i === 0 ? "#e63946" : "rgba(255, 255, 255, 0.5)",
                    borderRadius: "50%",
                    display: "inline-block",
                    transition: "background-color 0.3s",
                }}
            ></div>
        )
    };

    const carouselImages = [
        { src: carrusel1, caption: 'Nuestros bomberos listos para la acción.' },
        { src: carrusel2, caption: 'La defensa civil monitoreando áreas de riesgo.' },
        { src: carrusel3, caption: 'Personal de salud en alerta ante emergencias.' },
    ];


    return (
        <MainLayout>
            <div className="w-full min-h-screen font-sans">
                
                {/* 1. SECCIÓN HERO / INFO PRINCIPAL (Fondo Azul) */}
                <section className="bg-[#1d3557] py-20 lg:py-28 text-center text-white">
                    <div className="max-w-7xl mx-auto px-5">
                        <p className="text-sm font-semibold uppercase text-[#e63946] tracking-widest">
                            BIENVENIDOS A DESAS3
                        </p>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mt-4 mb-5 max-w-4xl mx-auto leading-tight">
                            SISTEMA INTEGRAL PARA LA <span className='text-red-500'>GESTIÓN DE DESASTRES</span> NATURALES
                        </h1>
                        <p className="text-lg sm:text-xl text-blue-300 mb-10 max-w-2xl mx-auto">
                            Plataforma tecnológica que monitorea, analiza y coordina respuestas ante emergencias naturales, salvando vidas y protegiendo comunidades.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-5">
                            <Link 
                                href="/chat?reporte=emergencia-general" 
                                className="px-8 py-4 text-base sm:text-lg font-bold rounded-lg transition duration-300 no-underline 
                                            bg-gradient-to-r from-red-600 to-red-700 text-white shadow-xl shadow-red-500/50 hover:from-red-700 hover:to-red-800 uppercase"
                            >
                                <i className="fas fa-siren-on mr-3"></i> REPORTAR EMERGENCIA
                            </Link>
                            <Link
                                href="#"
                                className="px-8 py-4 text-base sm:text-lg font-bold rounded-lg transition duration-300 no-underline
                                            bg-transparent text-white border-2 border-white hover:bg-white hover:text-blue-900 uppercase"
                            >
                                CONOCE EL PROYECTO
                            </Link>
                        </div>
                    </div>
                </section>

                {/* 2. SECCIÓN DE TIPOS DE DESASTRES */}
                <section className="py-16 md:py-20 bg-gray-50 text-center">
                    <div className="max-w-xl mx-auto px-5">
                        
                        {/* Botón Principal de Emergencia */}
                        <div className="mb-4">
                            <Link href="/chat?reporte=emergencia-inmediata" 
                                className="bg-red-600 text-white px-8 py-4 text-xl font-bold rounded-xl block w-full max-w-sm mx-auto transition duration-300 hover:bg-red-700 no-underline uppercase shadow-xl shadow-red-500/40"
                            >
                                LLAMAR A ASISTENCIA RÁPIDA
                            </Link>
                            <p className="text-sm text-gray-500 mt-2 mb-10">¡Solo para casos de riesgo de vida inmediato!</p>
                        </div>
                        
                        {/* Título de Selección */}
                        <div className="mb-10">
                            <h2 className="text-3xl font-bold text-blue-900">Reporta un desastre específico</h2>
                        </div>
                        
                        {/* Grid de Tarjetas de Emergencia usando el componente auxiliar DisasterCard */}
                        <div className="grid grid-cols-2 gap-6 max-w-lg mx-auto">
                            <DisasterCard img={incendio} alt="Incendio" title="Incendio" subtitle="Fuego en vivienda, bosque o área urbana" report="incendio" />
                            <DisasterCard img={derrumbe} alt="Derrumbe/Avalancha" title="Derrumbe" subtitle="Deslizamiento de tierra o flujo de lodo" report="derrumbe" />
                            <DisasterCard img={inundacion} alt="Inundación" title="Inundación" subtitle="Crecimiento de ríos, calles con agua" report="inundacion" />
                            <DisasterCard img={tormenta} alt="Tormenta" title="Tormenta" subtitle="Vientos fuertes, rayos o granizo" report="tormenta" />
                        </div>
                    </div>
                </section>

                {/* 3. SECCIÓN DE ENTIDADES COLABORADORAS (MODIFICADA) */}
                <section className="py-16 bg-white">
                    <div className="max-w-7xl mx-auto px-5">
                        <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">Entidades Colaboradoras</h2>
                        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
                           {/* Pasamos la prop imgSrc con la ruta de cada imagen */}
                            <EntityItem name="Cruz Roja" description="Asistencia humanitaria y atención médica." link="#" imgSrc={cruzRoja} />
                            <EntityItem name="Defensa Civil" description="Prevención, mitigación y atención de desastres." link="#" imgSrc={defensaCivil} />
                            <EntityItem name="Bomberos" description="Respuesta inmediata a incendios y rescates." link="#" imgSrc={bomberosLogo} />
                            <EntityItem name="UNGRD" description="Coordinación nacional de gestión del riesgo." link="#" imgSrc={ungrd} />
                        </div>
                    </div>
                </section>
                
                {/* 4. Carrusel de situaciones */}
                <section className="py-20 bg-[#0d1b2a] text-white">
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

                {/* 5. SECCIÓN DE DESCARGA DE APP */}
                <section className="py-20 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-5 flex flex-col lg:flex-row items-center gap-10">
                        <div className="lg:w-2/3">
                            <h2 className="text-3xl font-bold text-blue-900 mb-5">Descarga la App Móvil</h2>
                            <ul className="list-none p-0 mb-8 space-y-4">
                                <li className="text-lg text-gray-700 flex items-start">
                                    <i className="fas fa-check-circle text-red-600 text-xl mt-1 mr-4"></i> Reporte rápido de incidentes **geolocalizados**.
                                </li>
                                <li className="text-lg text-gray-700 flex items-start">
                                    <i className="fas fa-check-circle text-red-600 text-xl mt-1 mr-4"></i> Alertas y notificaciones de **riesgo en tiempo real**.
                                </li>
                                <li className="text-lg text-gray-700 flex items-start">
                                    <i className="fas fa-check-circle text-red-600 text-xl mt-1 mr-4"></i> Guías de **prevención** y contacto de emergencia.
                                </li>
                            </ul>
                            <div className="flex flex-wrap gap-4">
                                <img src="/images/googlep.png" alt="Google Play" className="h-12 w-auto cursor-pointer hover:scale-[1.05] transition" />
                                
                            </div>
                        </div>
                        <div className="lg:w-1/3 flex justify-center mt-10 lg:mt-0">
                            <div className="bg-white p-6 rounded-xl shadow-2xl text-center max-w-xs">
                                <h4 className="text-xl font-semibold text-blue-900 mb-4">Escanea para Descargar</h4>
                                <img src={qrCode} alt="Código QR" className="w-44 h-44 mx-auto mb-4 border border-gray-200 p-1" />
                                <p className="text-gray-600 text-sm">Disponible para Android.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 6. CTA Section */}
                <section className="py-16 text-center text-white bg-gradient-to-r from-red-600 to-red-800">
                    <h2 className="text-3xl font-bold mb-3">¿Eres una entidad de respuesta? Regístrate</h2>
                    <Link 
                        href="/register" 
                        className="bg-white text-red-600 px-8 py-3 text-lg font-bold rounded-lg mt-5 inline-block transition duration-300 hover:bg-gray-100 no-underline uppercase shadow-lg shadow-black/30"
                    >
                        <i className="fas fa-user-plus mr-2"></i> Registrarse Ahora
                    </Link>
                </section>

            </div>
        </MainLayout>
    );
};

export default Home;