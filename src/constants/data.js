// src/constants/data.js

// URLs de Redes Sociales y Contacto
export const SOCIAL_LINKS = {
    email: "contacto@refugiolab.com",
    instagram: "https://www.instagram.com/refugio_________",
    whatsapp: "https://wa.me/message/6ZMNWYQBIN5HA1",
};

// Rutas de Navegación
export const NAV_LINKS = {
    aboutUs: "/sobre-mi",
    faqs: "/faq",
    home: "/inicio",
    blog: "/cartas-al-mar",
    products: "/lifewear",
    contact: "/contacto",
    sensoryUniverse: "/universo-sensorial",
};

// Rutas de las imágenes
export const IMAGE_PATHS = {
    logo: "/icons/logo.png",
    logoRefugioGris: "/icons/logorefugiogris.svg", // Clave corregida
    blogPost: "/images/blogcartasalmar.png",
    ojoRefugio: "/images/ojo-refugio.png",
    separadorBloques: {
        png: "/images/separador-bloques.png",
        webp: "/images/separador-bloques.webp",
    },
};

// Rutas de los iconos de redes sociales
export const SOCIAL_ICON_PATHS = {
    instagram: "/icons/instagram.png",
    whatsapp: "/icons/whatsapp.png",
    youtube: "/icons/youtube.png",
};

// Textos estáticos
export const TEXT_CONTENT = {
    footer: {
        motto: "La vida es un ritual",
        copy: "© 2025 Refugio. Todos los derechos reservados.",
    },
    blog: {
        title: "Cartas al Mar",
        intro: "Sumérgete en un océano de pensamientos, historias y reflexiones sobre el habitar, la creatividad y la consciencia. Aquí, cada palabra es un faro que ilumina un nuevo camino.",
        button: "Leer el artículo completo",
    },
    // Nuevos datos centralizados
    homePage: {
        pilares: [
            {
                id: 'bloque-1',
                text: 'En nuestro universo, vestir es mucho más que cubrir el cuerpo: es la forma en que nos manifestamos al mundo.',
            },
            {
                id: 'bloque-2',
                text: 'Creemos en la atemporalidad. Trascendemos el lujo del exceso para celebrar el verdadero lujo de lo que perdura: lo hecho a mano, lo ético, lo que lleva alma.',
            },
            {
                id: 'bloque-3',
                text: 'Te invitamos a habitar el presente con piezas que eleven tu bienestar.',
            },
        ],
        modal: {
            title: '¿Y si tu vida fuera tu obra de arte?',
            text: 'Entendemos el acto de refugiarse no como esconderse, sino como volver a casa, a tu propia esencia. Es un acto de conexión que se siente, que se viste, que se vive.',
            button: 'EXPLORAR UNIVERSO SENSORIAL',
        },
    },
    contactPage: {
        header: {
            title: 'Contacta con nosotros',
            subtitle: 'Nos encantaría saber de ti y responder a cualquier pregunta que tengas.',
        },
        info: {
            text: '¿Tienes una consulta, una propuesta o simplemente quieres saludar? Estamos aquí para escucharte.',
            socialPrompt: 'Envíanos un correo electrónico a:',
        },
        form: {
            name: {
                label: 'Nombre completo',
                placeholder: 'Nombre completo',
            },
            email: {
                label: 'Correo electrónico',
                placeholder: 'Correo electrónico',
            },
            message: {
                label: 'Tu mensaje...',
                placeholder: 'Tu mensaje...',
            },
            button: 'Enviar Mensaje',
        },
        modal: {
            title: '¡Mensaje Enviado!',
            text: 'Gracias por contactarnos. Nos pondremos en contacto contigo pronto.',
        },
    },
};