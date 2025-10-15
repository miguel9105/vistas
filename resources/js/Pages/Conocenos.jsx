import React from 'react';
import MainLayout from '../Layouts/MainLayout';
// CORRECCIÓN: Aseguramos la importación de todos los íconos usados en el componente.
import { FaGithub, FaTwitter, FaCode, FaEnvelope } from 'react-icons/fa'; 

// Importar imágenes (Rutas Absolutas desde public/images/)
const kodelamd = '/images/kodelamd.JPG';
const michelle = '/images/michelle.jpg'; 
const adriana = '/images/adriana.jpg';
const david = '/images/david.jpg';
const kevin = '/images/kevin.jpg';
const luis = '/images/luis.jpg';

// Base de GitHub para construir los enlaces:
const GITHUB_BASE = "https://github.com/";

// --- COMPONENTE AUXILIAR: TeamMemberCard (SIN EMAIL, FONDO AMBER-50) ---
const TeamMemberCard = ({ image, name, role, description, socialLinks }) => (
    <div className="mb-4">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden transition duration-500 hover:shadow-2xl hover:-translate-y-2 h-full">
            
            {/* Fondo del contenedor de la imagen ajustado a un beige claro (amber-50) */}
            <div className="relative aspect-[4/3] overflow-hidden bg-amber-50"> 
                <img 
                    src={image} 
                    alt={name} 
                    className="w-full h-full object-contain p-4 transition duration-500 ease-in-out hover:scale-105" 
                /> 
                
                {/* Overlay Social - Solo GitHub y Twitter */}
                <div className="absolute inset-0 bg-blue-900/75 opacity-0 hover:opacity-100 transition duration-500 flex items-center justify-center space-x-3">
                    {socialLinks.github && (
                        <a 
                            href={socialLinks.github} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-white text-3xl p-2 hover:text-red-400 transition" 
                            aria-label="GitHub"
                        >
                            <FaGithub />
                        </a>
                    )}
                    {socialLinks.twitter && (
                        <a 
                            href={socialLinks.twitter} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-white text-3xl p-2 hover:text-red-400 transition" 
                            aria-label="Twitter"
                        >
                            <FaTwitter />
                        </a>
                    )}
                    {/* El ícono de FaEnvelope fue removido aquí por la solicitud anterior */}
                </div>
            </div>
            
            <div className="p-6 text-center">
                <h5 className="text-xl font-bold text-gray-800 mb-1">{name}</h5>
                <p className="text-sm font-semibold text-red-600 uppercase tracking-wider mb-3">{role}</p> 
                <p className="text-gray-600 text-sm">{description}</p>
            </div>
        </div>
    </div>
);


const Conocenos = () => {
    // Datos del equipo
    const teamData = [
        { 
            image: michelle, 
            name: "Michelle Jimenez", 
            role: "Diseño UX/UI & Frontend", 
            description: "Enfocada en crear interfaces intuitivas y atractivas.", 
            socialLinks: { 
                github: `${GITHUB_BASE}MichelleJimenez01`, 
                email: "michelle.j@inventado.com"
            } 
        },
        { 
            image: adriana, 
            name: "Adriana Moreno", 
            role: "Frontend Developer", 
            description: "Especialista en convertir diseños en código React funcional.", 
            socialLinks: { 
                github: `${GITHUB_BASE}adrimore30`, 
                email: "caradrimocas31@gmail.com" 
            } 
        },
        { 
            image: david, 
            name: "David Martinez", 
            role: "Backend Developer", 
            description: "Arquitectura de bases de datos y APIs robustas con Laravel.", 
            socialLinks: { 
                github: `${GITHUB_BASE}Davidalexander359`, 
                email: "david.m@inventado.com" 
            } 
        },
        { 
            image: kevin, 
            name: "Kevin Peña", 
            role: "Project Manager & Backend", 
            description: "Liderazgo de proyecto y desarrollo de lógica de negocio.", 
            socialLinks: { 
                github: `${GITHUB_BASE}Kev37-7`, 
                email: "kevin.p@inventado.com" 
            } 
        },
        { 
            image: luis, 
            name: "Luis Tao", 
            role: "Full Stack Developer", 
            description: "Experto en integración completa, de la base de datos a la vista.", 
            socialLinks: { 
                github: `${GITHUB_BASE}miguel9105`, 
                email: "luismiguel200365@gmail.com" 
            } 
        },
    ];

    return (
        <MainLayout>
            <div className="w-full min-h-screen font-sans bg-gray-50">
                
                {/* Sección Hero: Conócenos */}
                <section className="bg-white py-20 lg:py-28">
                    <div className="max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between text-center lg:text-left">
                        
                        <div className="lg:w-3/5 xl:w-7/12 mb-10 lg:mb-0 lg:pr-10 order-2 lg:order-1">
                            <h1 className="text-5xl lg:text-6xl font-extrabold text-blue-900 mb-2">
                                Conócenos
                            </h1>
                            <div className="w-24 h-1.5 bg-red-600 rounded mb-6 mx-auto lg:mx-0"></div>
                            
                            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                                Somos KODELAMD un equipo de cinco jóvenes innovadores que han unido fuerzas para revolucionar el mundo del desarrollo de software. Nuestra pasión por la tecnología nos impulsa a crear soluciones digitales a medida que no solo cumplen, sino que superan las expectativas.
                            </p>
                            
                            <a href="#equipo" className="inline-flex items-center bg-blue-900 text-white px-8 py-3 rounded-full font-semibold transition duration-300 hover:bg-blue-800 hover:-translate-y-0.5 shadow-md shadow-blue-900/40 no-underline text-lg">
                                <FaCode className="mr-3" /> 
                                Ver Nuestro Equipo
                            </a>
                        </div>

                        <div className="lg:w-2/5 xl:w-5/12 flex justify-center lg:justify-end order-1 lg:order-2">
                            <div className="w-80 h-48 lg:w-96 lg:h-56 rounded-2xl overflow-hidden relative shadow-2xl shadow-blue-300/50 border-8 border-gray-50 flex items-center justify-center p-2">
                                <img src={kodelamd} alt="Kodelamd Logo" className="w-full h-full object-contain" />
                            </div>
                        </div>

                    </div>
                </section>

                {/* Sección "Quiénes Somos" */}
                <section id="quienes-somos" className="py-16 bg-gray-50">
                    <div className="max-w-4xl mx-auto px-6 text-center">
                        <h2 className="text-3xl font-extrabold text-blue-900 mb-4">Quiénes Somos</h2>
                        <div className="w-20 h-1 bg-red-600 rounded mb-8 mx-auto"></div>
                        
                        <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
                            Somos los creadores de DESAS3, un sistema de comunicación diseñado específicamente para enfrentar y mitigar los riesgos de desastres naturales en nuestra comunidad. Nuestro objetivo es usar la tecnología para salvar vidas.
                        </p>
                    </div>
                </section>

                {/* Sección del equipo */}
                <section id="equipo" className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-6">
                        <h2 className="text-4xl font-extrabold text-center text-red-600 mb-12">
                            Nuestro Equipo 
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                            {teamData.map((member, index) => (
                                <TeamMemberCard 
                                    key={index}
                                    image={member.image}
                                    name={member.name}
                                    role={member.role}
                                    description={member.description}
                                    socialLinks={member.socialLinks}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Llamado a la Acción */}
                <section className="py-20 text-white text-center bg-blue-900 shadow-inner">
                    <div className="max-w-4xl mx-auto px-6">
                        <h2 className="text-4xl font-extrabold mb-3">¿Listo para colaborar? </h2>
                        <p className="text-xl mb-8 opacity-90">Contáctanos para más información sobre nuestros proyectos.</p>
                        
                        {/* FaEnvelope se usa aquí, por eso debe estar importado */}
                        <a href="mailto:desas3@sena.edu.co" className="inline-flex items-center bg-red-600 text-white px-10 py-4 rounded-full text-lg font-bold border-2 border-red-600 transition duration-300 hover:bg-transparent hover:border-white hover:scale-105 no-underline">
                            <FaEnvelope className="mr-3" /> 
                            Escríbenos Hoy
                        </a>
                    </div>
                </section>
            </div>
        </MainLayout>
    );
};

export default Conocenos;