import React, { useState } from 'react';
import './EditProduct.css';

const EditProduct = ({ product, onSave, onCancel }) => {
  const [name, setName] = useState(product.name);
  const [ean, setEan] = useState(product.ean);
  const [quantity, setQuantity] = useState(product.quantity);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...product, name, ean, quantity });
  };

  return (
    <form onSubmit={handleSubmit} className="edit-product-form">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        value={ean}
        onChange={(e) => setEan(e.target.value)}
        required
      />
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(parseInt(e.target.value))}
        required
      />
      <button type="submit">Aceptar</button>
      <button type="button" onClick={onCancel}>Cancelar</button>
    </form>
  );
};

export default EditProduct;
