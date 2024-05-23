import React, { useState, useEffect } from 'react';
import AgYEdit from './componentes/AgYEdit';
import Producto from './componentes/Producto';
import './App.css';

const App = () => {
  const [productos, setProducto] = useState(JSON.parse(localStorage.getItem('productos')) || []);
  const [productoToEdit, setProductoToEdit] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  useEffect(() => {
    localStorage.setItem('productos', JSON.stringify(productos));
  }, [productos]);

  const agregarProducto = (producto) => {
    setProducto([...productos, { ...producto, id: Date.now() }]);
  };

  const incrementarProducto = (id) => {
    setProducto(productos.map(producto => 
      producto.id === id ? { ...producto, cantidad: producto.cantidad + 1 } : producto
    ));
  };

  const editarProducto = (ModificarProducto) => {
    setProducto(productos.map(producto => 
      producto.id === ModificarProducto.id ? ModificarProducto : producto
    ));
  };

  const borrarProducto = (id) => {
    setProducto(productos.filter(producto => producto.id !== id));
  };

  const borrarEdicion = () => {
    setProductoToEdit(null);
    setMostrarFormulario(false);
  };

  return (
    <div className="app">
      <div className="header">
        <h1>Control Depósito</h1>
        <button className="add-btn" onClick={() => setMostrarFormulario(true)}>➕</button>
      </div>
      {mostrarFormulario && (
        <AgYEdit 
          agregarProducto={agregarProducto} 
          editarProducto={editarProducto} 
          productoToEdit={productoToEdit}
          borrarEdicion={borrarEdicion}
          ocultarFormulario={() => setMostrarFormulario(false)} 
        />
      )}
      <Producto 
        productos={productos} 
        incrementarProducto={incrementarProducto} 
        editarProducto={(producto) => {
          setProductoToEdit(producto);
          setMostrarFormulario(true);
        }} 
        borrarProducto={borrarProducto} 
      />
    </div>
  );
};

export default App;
