import React from 'react';

// Componente de Formulario de Contacto (Para la sección Atelier: Diseñá tu refugio)
const FormularioContacto = () => {
    // Estado para manejar los datos del formulario
    const [formData, setFormData] = React.useState({
        nombre: '',
        email: '',
        telefono: '',
        mensaje: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Solicitud de Diseño enviada. ¡Gracias! Nos pondremos en contacto pronto.');
        // Aquí iría la lógica para enviar los datos a tu servicio
        console.log('Datos a enviar:', formData);
        setFormData({ nombre: '', email: '', telefono: '', mensaje: '' });
    };

    return (
        <form className="atelier-contact-form" onSubmit={handleSubmit}>
            <p className="form-legend">Dejanos tus datos y nos pondremos en contacto:</p>
            <div className="form-group-row">
                <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre y Apellido"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group-row">
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="tel"
                    name="telefono"
                    placeholder="Número de contacto"
                    value={formData.telefono}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group-row">
                <textarea
                    name="mensaje"
                    placeholder="Mensaje (Contanos sobre tu idea)"
                    rows="4"
                    value={formData.mensaje}
                    onChange={handleChange}
                    required
                ></textarea>
            </div>
            <button type="submit" className="submit-button">
                Enviar Solicitud de Diseño
            </button>
        </form>
    );
};


// Configuración por defecto si la ruta no coincide
export const defaultConfig = {
    title: 'Nueva Experiencia',
    image: null, // Si no hay imagen, usamos un placeholder de color
    message: 'Estamos preparando algo hermoso y consciente para ti. Vuelve pronto para descubrir este nuevo espacio de Refugio.',
    valueProp: 'Una sorpresa exclusiva por la espera.',
};

/**
 * Mapeo de configuraciones para cada sección 'Próximamente'.
 */
export const comingSoonConfig = {
    // Sección: yogawear (Título: Muy pronto, Nuevo Mensaje)
    'yogawear': {
        title: 'Muy pronto', 
        image: '/images/homeyogawear.webp', 
        message: (
            <>
                <p>Nuestra línea de yoga será la extensión de tu intención. Las prendas honrarán tu calma activa y bienestar integral, permitiendo que la fluidez, la pausa y la conciencia te acompañen en cada asana.</p>
                <p className="bold">La verdadera alineación comienza con lo que elegís vestir.</p>
            </>
        ), 
        valueProp: 'Un adelanto exclusivo de los diseños y materiales.',
    },
    // Sección: cartas-al-mar (Título: Muy pronto, Nuevo Mensaje)
    'cartas-al-mar': {
        title: 'Muy pronto', 
        image: '/images/cartas-al-mar-menu.webp',
        message: (
            <>
                <p>Un espacio dedicado a la introspección, la reflexión profunda y la conexión con el ciclo de la naturaleza. </p>
                <p>En nuestra guía editorial encontrarás una curaduría de textos esenciales para transformar tu modo de habitar. Cada artículo será una herramienta que te invita a honrar tu valor, a diseñar tu tiempo con absoluta claridad y a tomar el control de tu propio ritmo.</p>
            </>
        ), 
        valueProp: 'La primera carta de inspiración firmada por la fundadora.',
    },
    // Sección: universo-refugio (Ahora Experiencia Atelier - Titulo y Contenido Especial)
    'universo-refugio': {
        title: 'Diseñá tu refugio', 
        image: '/images/universo-refugio-menu.webp',
        // El mensaje ahora incluye todo el texto y la información de contacto
        message: (
            <div className="atelier-content-block">
                <p>
                    Te invitamos a trascender la compra y acceder a la experiencia de la co-creación.
                    A partir de nuestra maestría artesanal y nuestra propuesta de diseño base
                    (patrones, siluetas y técnicas de crochet), podés diseñar tu pieza ideal.
                </p>
                <p className="atelier-section-title">Diseño Exclusivo:</p>
                <p>
                    Desarrollamos prendas específicas para tus necesidades,
                    para un evento especial hasta un diseño único, a medida y atemporal que responda a
                    tu estilo de vida.
                </p>
                <p className="bold">
                    Vos elegís la intención, y nosotros creamos la forma.
                </p>
                <div className="atelier-contact-info">
                    <a href="mailto:contacto@refugiolab.com">contacto@refugiolab.com</a>
                    <span>•</span>
                    <a href="tel:+5493413628224">+549 3413628224</a>
                </div>
            </div>
        ),
        isAtelier: true, // Flag para renderizado especial
        contactForm: <FormularioContacto />, // Componente de formulario
        valueProp: 'La experiencia de co-creación más exclusiva.', 
    },
    // Sección: programa-bienestar (Título: Muy pronto, Contenido Anterior, Newsletter)
    'programa-bienestar': {
        title: 'Muy pronto', 
        image: '/images/programa-bienestar-menu.webp',
        message: 'Un espacio de herramientas y recursos para habitar(nos) desde la calma. Talleres, meditaciones y rutinas para integrar el bienestar en tu día a día.',
        valueProp: 'Una meditación guiada de 15 minutos para la calma inmediata.',
    },
};