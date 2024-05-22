import React from 'react';
import Mostrar from './Mostrar';

const Producto = ({ productos, incrementarProducto, editarProducto, borrarProducto }) => {
  const sortedProductos = [...productos].sort((a, b) => a.nombre.localeCompare(b.nombre));
  return (
    <div>
      {sortedProductos.map((producto) => (
        <Mostrar 
          key={producto.id} 
          producto={producto} 
          incrementarProducto={incrementarProducto}
          editarProducto={editarProducto}
          borrarProducto={borrarProducto}
        />
      ))}
    </div>
  );
};

export default Producto;
