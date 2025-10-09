import React from 'react';
import MainLayout from '../Layouts/MainLayout';
import './Conocenos.css';
import { FaFacebook, FaGithub, FaTwitter, FaEnvelope, FaCode } from 'react-icons/fa';

// Importar imágenes (asume que están en public/images/o resources/js/assets)
const kodelamd = '/images/kodelamd.JPG';
const michelle = '/images/michelle.jpg';
const adriana = '/images/adriana.jpg';
const david = '/images/david.jpg';
const kevin = '/images/kevin.jpg';
const luis = '/images/luis.jpg';

const TeamMemberCard = ({ image, name, role, description, socialLinks }) => (
    <div className="team-member-wrapper mb-4">
        <div className="team-card shadow-sm border-0">
            <div className="team-image-container">
                <img src={image} alt={name} className="img-fluid" /> 
                <div className="team-overlay">
                    <div className="social-links-overlay">
                        {socialLinks.github && (
                            <a href={socialLinks.github} className="btn" aria-label="GitHub"><FaGithub /></a>
                        )}
                        {socialLinks.twitter && (
                            <a href={socialLinks.twitter} className="btn" aria-label="Twitter"><FaTwitter /></a>
                        )}
                        {socialLinks.email && (
                            <a href={`mailto:${socialLinks.email}`} className="btn" aria-label="Email"><FaEnvelope /></a>
                        )}
                        {/* Se eliminó Facebook para mantener un set más profesional (GitHub, Twitter, Email) */}
                    </div>
                </div>
            </div>
            <div className="card-body p-4 text-center">
                <h5 className="card-title fw-bold">{name}</h5>
                {/* Texto de rol más prominente */}
                <p className="role-text mb-3">{role}</p> 
                <p className="card-text text-muted">{description}</p>
            </div>
        </div>
    </div>
);


const Conocenos = () => {
    // Datos del equipo (ajusta los links sociales)
    const teamData = [
        { image: michelle, name: "Michelle Cardenas", role: "Diseño UX/UI & Frontend", description: "Enfocada en crear interfaces intuitivas y atractivas.", socialLinks: { github: "#", email: "michelle@kode.com" } },
        { image: adriana, name: "Adriana Otero", role: "Frontend Developer", description: "Especialista en convertir diseños en código React funcional.", socialLinks: { github: "#", email: "adriana@kode.com" } },
        { image: david, name: "David Correa", role: "Backend Developer", description: "Arquitectura de bases de datos y APIs robustas con Laravel.", socialLinks: { github: "#", email: "david@kode.com" } },
        { image: kevin, name: "Kevin Viveros", role: "Project Manager & Backend", description: "Liderazgo de proyecto y desarrollo de lógica de negocio.", socialLinks: { github: "#", email: "kevin@kode.com" } },
        { image: luis, name: "Luis Osorio", role: "Full Stack Developer", description: "Experto en integración completa, de la base de datos a la vista.", socialLinks: { github: "#", email: "luis@kode.com" } },
    ];

    return (
        <MainLayout>
            <div className="conocenos-page">
                {/* Sección Hero: Diseño Lateral */}
                <section className="hero-section">
                    <div className="container hero-container">
                        
                        <div className="hero-text">
                            <h1 className="hero-title">Conócenos</h1>
                            <div className="divider"></div>
                            <p className="hero-description">
                                En **KodeLAMD**, somos un equipo de cinco jóvenes innovadores que han unido fuerzas para revolucionar el mundo del desarrollo de software. Nuestra pasión por la tecnología nos impulsa a crear soluciones digitales a medida que no solo cumplen, sino que superan las expectativas.
                            </p>
                            {/* Botón CTA primario en el Hero */}
                             <a href="#equipo" className="btn-hero">
                                <FaCode style={{ marginRight: '10px' }} /> 
                                Ver Nuestro Equipo
                            </a>
                        </div>

                         <div className="hero-logo-wrapper">
                            <div className="hero-logo-circle">
                                <img src={kodelamd} alt="Kodelamd Logo" className="img-fluid" />
                            </div>
                        </div>

                    </div>
                </section>

                {/* Sección "Quiénes Somos" */}
                <section id="quienes-somos" className="quienes-somos-section">
                    <div className="container text-center">
                        <h2 className="display-5 fw-bold section-subtitle">Quiénes Somos</h2>
                        <div className="bg-primary mx-auto mb-5 divider-short"></div>
                        <p className="lead text-muted">
                            Somos los creadores de **DESAS3**, un sistema de comunicación diseñado específicamente para enfrentar y mitigar los riesgos de desastres naturales en nuestra comunidad. Nuestro objetivo es usar la tecnología para salvar vidas.
                        </p>
                    </div>
                </section>
                
                {/* Sección del equipo */}
                <section id="equipo" className="team-section">
                    <div className="container">
                        <h2 className="section-title text-center">Nuestro Equipo ✨</h2>
                        <div className="team-grid">
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

                {/* Llamado a la Acción: Fondo más oscuro y botón de alto contraste */}
                <section className="cta-section">
                    <div className="container text-center">
                        <h2>¿Listo para colaborar? 🚀</h2>
                        <p>Contáctanos para más información sobre nuestros proyectos.</p>
                        <a href="mailto:desas3@sena.edu.co" className="btn-cta-contact">
                            <FaEnvelope style={{ marginRight: '10px' }} /> 
                            Escríbenos Hoy
                        </a>
                    </div>
                </section>
            </div>
        </MainLayout>
    );
};

export default Conocenos;