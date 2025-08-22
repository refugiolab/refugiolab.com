import React from 'react';
import './NudosDeSal.css';
import mar from '../../public/images/mar.png'; // Reutilizamos esta imagen para evitar errores de importación

const NudosDeSal = () => {
  const productos = [
    {
      nombre: 'Vestido de Lino',
      descripcion: 'Ligereza y confort para conectar con la naturaleza.',
      imagen: mar, // Usamos la imagen del mar temporalmente
    },
    {
      nombre: 'Pantalón de Algodón',
      descripcion: 'Movimiento y fluidez para el día a día.',
      imagen: mar, // Usamos la imagen del mar temporalmente
    },
    {
      nombre: 'Kimono de Seda Cruda',
      descripcion: 'Elegancia atemporal y versatilidad.',
      imagen: mar, // Usamos la imagen del mar temporalmente
    },
  ];

  return (
    <section id="nudos-de-sal" className="nudos-de-sal-section">
      <div className="nudos-de-sal-header">
        <h2 className="nudos-de-sal-title">Nudos de Sal</h2>
        <p className="nudos-de-sal-subtitle">
          Texturas y formas que narran historias de mar y movimiento.
        </p>
      </div>
      <div className="productos-grid">
        {productos.map((producto, index) => (
          <div key={index} className="producto-card">
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className="producto-imagen"
            />
            <div className="producto-info">
              <h3 className="producto-nombre">{producto.nombre}</h3>
              <p className="producto-descripcion">{producto.descripcion}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NudosDeSal;