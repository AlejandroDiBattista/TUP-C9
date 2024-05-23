import React, { useState } from 'react';
import './ProductForm.css';

const ProductForm = ({ onAddProduct }) => {
  const [name, setName] = useState('');
  const [ean, setEan] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddProduct({ name, ean, quantity: 1 });
    setName('');
    setEan('');
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nombre del Producto"
        required
      />
      <input
        type="text"
        value={ean}
        onChange={(e) => setEan(e.target.value)}
        placeholder="Código EAN"
        required
      />
      <button type="submit" className="add-button">+</button>
    </form>
  );
};

export default ProductForm;
