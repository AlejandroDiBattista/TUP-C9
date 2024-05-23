import React from 'react';

const Mostrar = ({ producto, incrementarProducto, editarProducto, borrarProducto }) => {
  return (
    <div className="producto-item">
      <div className="producto-cantidad">
        <h2>{producto.cantidad}</h2>
      </div>
      <div className="producto-detalle">
        <p className="producto-nombre">{producto.nombre}</p>
        <p className="producto-ean">{producto.ean}</p>
      </div>
      <div className="producto-acciones">
        <button onClick={() => incrementarProducto(producto.id)}>➕</button>
        <button onClick={() => editarProducto(producto)}>✏️</button>
        <button onClick={() => borrarProducto(producto.id)}>🗑️</button>
      </div>
    </div>
  );
};

export default Mostrar;
