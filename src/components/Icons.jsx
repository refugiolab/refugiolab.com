import React from 'react';

// --- Íconos de Navegación ---

// Ícono de Menú (Hamburguesa)
export const MenuIcon = ({ color = 'currentColor', width = '24', height = '24' }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width={width} 
        height={height} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>
);

// Ícono de Flecha hacia abajo (para submenús)
export const ChevronDown = ({ color = 'currentColor', width = '24', height = '24', className = '' }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width={width} 
        height={height} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
    >
        <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
);

// --- Íconos de Utilidad (Header Derecho) ---

// Ícono de Búsqueda
export const SearchIcon = ({ color = 'currentColor', width = '24', height = '24' }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width={width} 
        height={height} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
);

// Ícono de Usuario (Mi Cuenta)
export const UserIcon = ({ color = 'currentColor', width = '24', height = '24' }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width={width} 
        height={height} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
    </svg>
);

// Ícono de Bolsa / Carrito
export const CustomBagIcon = ({ color = 'currentColor', width = '24', height = '24' }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width={width} 
        height={height} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <path d="M16 10a4 4 0 0 1-8 0"></path>
    </svg>
);

// --- Íconos de Redes Sociales ---

// Ícono de Facebook
export const FacebookIcon = ({ color = 'currentColor', width = '24', height = '24' }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width={width} 
        height={height} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
    </svg>
);

// Ícono de Instagram
export const InstagramIcon = ({ color = 'currentColor', width = '24', height = '24' }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width={width} 
        height={height} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
);

// Ícono de Pinterest
export const PinterestIcon = ({ color = 'currentColor', width = '24', height = '24' }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width={width} 
        height={height} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <path d="M12.17 21v-8.83l-3.23-1.63a4.05 4.05 0 0 1 1.7-3.79 5.8 5.8 0 0 1 3.56-1.39c3.12 0 5.67 2.5 5.67 5.56 0 3.06-2.55 5.56-5.67 5.56-1.57 0-3.04-.66-4.1-1.85"></path>
    </svg>
);