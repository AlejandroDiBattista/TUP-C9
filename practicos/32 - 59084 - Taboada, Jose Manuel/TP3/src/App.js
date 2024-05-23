import React, { useState } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [productos, setProductos] = useState([]);
  const [nuevoNombreProducto, setNuevoNombreProducto] = useState('');
  const [nuevoEANProducto, setNuevoEANProducto] = useState('');
  const [contador, setContador] = useState(1); // Inicializamos el contador en 1

  const manejarAgregarProducto = () => {
    if (nuevoNombreProducto.trim() && nuevoEANProducto.trim()) {
      const indiceProductoExistente = productos.findIndex(producto => producto.ean === nuevoEANProducto);

      if (indiceProductoExistente >= 0) {
        const productosActualizados = [...productos];
        productosActualizados[indiceProductoExistente].cantidad += 1;
        setProductos(productosActualizados);
      } else {
        setProductos([...productos, { id: contador, nombre: nuevoNombreProducto, ean: nuevoEANProducto, cantidad: 1 }]);
        setContador(contador + 1); // Incrementamos el contador para el siguiente producto
      }

      setNuevoNombreProducto('');
      setNuevoEANProducto('');
    }
  };

  const manejarActualizarProducto = (id, productoActualizado) => {
    const productosActualizados = productos.map(producto => producto.id === id ? productoActualizado : producto);
    setProductos(productosActualizados);
  };

  const manejarEliminarProducto = (id) => {
    const productosActualizados = productos.filter(producto => producto.id !== id);
    setProductos(productosActualizados);
  };

  const productosOrdenados = productos.sort((a, b) => a.nombre.localeCompare(b.nombre));

  return (
    <div className="App">
      <h1>Gestor de Inventario</h1>
      <div className="formulario-agregar-producto">
        <input
          type="text"
          value={nuevoNombreProducto}
          onChange={(e) => setNuevoNombreProducto(e.target.value)}
          placeholder="Nombre del Producto"
        />
        <input
          type="text"
          value={nuevoEANProducto}
          onChange={(e) => setNuevoEANProducto(e.target.value)}
          placeholder="Código EAN"
        />
        <button onClick={manejarAgregarProducto}>Agregar Producto</button>
      </div>
      <div className="lista-productos">
        {productosOrdenados.map((producto) => (
          <ItemProducto
            key={producto.id} // Usar el id como clave
            producto={producto}
            onActualizarProducto={manejarActualizarProducto}
            onEliminarProducto={manejarEliminarProducto}
          />
        ))}
      </div>
    </div>
  );
}

function ItemProducto({ producto, onActualizarProducto, onEliminarProducto }) {
  const [editando, setEditando] = useState(false);
  const [nombreEditado, setNombreEditado] = useState(producto.nombre);
  const [eanEditado, setEANEditado] = useState(producto.ean);
  const [cantidadEditada, setCantidadEditada] = useState(producto.cantidad);

  const manejarGuardar = () => {
    onActualizarProducto(producto.id, { id: producto.id, nombre: nombreEditado, ean: eanEditado, cantidad: cantidadEditada });
    setEditando(false);
  };

  return (
    <div className="item-producto">
      {editando ? (
        <>
          <input
            type="text"
            value={nombreEditado}
            onChange={(e) => setNombreEditado(e.target.value)}
          />
          <input
            type="text"
            value={eanEditado}
            onChange={(e) => setEANEditado(e.target.value)}
          />
          <input
            type="number"
            value={cantidadEditada}
            onChange={(e) => setCantidadEditada(parseInt(e.target.value))}
          />
          <button onClick={manejarGuardar}>
            <FontAwesomeIcon icon={faEdit} />
          </button>
        </>
      ) : (
        <>
          <span>{producto.nombre}</span>
          <span>{producto.ean}</span>
          <span>{producto.cantidad}</span>
          <button onClick={() => setEditando(true)}>
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button onClick={() => onEliminarProducto(producto.id)}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </>
      )}
    </div>
  );
}

export default App;