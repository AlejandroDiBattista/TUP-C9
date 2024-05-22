import React, { useState, useEffect } from 'react';

const AgYEdit = ({ agregarProducto, editarProducto, productoToEdit, borrarEdicion, ocultarFormulario }) => {
  const [nombre, setNombre] = useState(productoToEdit ? productoToEdit.nombre : '');
  const [ean, setEAN] = useState(productoToEdit ? productoToEdit.ean : '');
  const [cantidad, setCantidad] = useState(productoToEdit ? productoToEdit.cantidad : 1);

  useEffect(() => {
    if (productoToEdit) {
      setNombre(productoToEdit.nombre);
      setEAN(productoToEdit.ean);
      setCantidad(productoToEdit.cantidad);
    }
  }, [productoToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (productoToEdit) {
      editarProducto({ ...productoToEdit, nombre, ean, cantidad });
      borrarEdicion();
    } else {
      agregarProducto({ nombre, ean, cantidad });
      ocultarFormulario(); // Ocultar el formulario después de agregar el producto
    }
    setNombre('');
    setEAN('');
    setCantidad(1);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={nombre} 
        onChange={(e) => setNombre(e.target.value)} 
        placeholder="Nombre del producto" 
        required 
      />
      <input 
        type="text" 
        value={ean} 
        onChange={(e) => setEAN(e.target.value)} 
        placeholder="Código EAN" 
        required 
      />
      <input 
        type="number" 
        value={cantidad} 
        onChange={(e) => setCantidad(Number(e.target.value))} 
        placeholder="Cantidad" 
        min="1" 
        required 
      />
      <button type="submit">{productoToEdit ? 'Guardar cambios' : 'Agregar producto'}</button>
      {productoToEdit && <button onClick={borrarEdicion}>Cancelar</button>}
    </form>
  );
};

export default AgYEdit;
