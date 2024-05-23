import React, { useState } from 'react';

function ProductForm({ addProduct }) {
  const [name, setName] = useState('');
  const [ean, setEan] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !ean) return;
    addProduct({ id: Date.now(), name, ean, quantity: 1 });
    setName('');
    setEan('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre del Producto"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Código EAN"
        value={ean}
        onChange={(e) => setEan(e.target.value)}
      />
      <button type="submit">Agregar Producto</button>
    </form>
  );
}

export default ProductForm;
