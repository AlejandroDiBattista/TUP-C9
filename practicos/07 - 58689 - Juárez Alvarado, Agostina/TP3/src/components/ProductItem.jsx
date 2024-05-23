import React from 'react';
import './ProductItem.css';

const ProductItem = ({ product, onIncrement, onEdit, onDelete }) => {
  return (
    <div className="product-item">
      <div className="quantity">{product.quantity}</div>
      <div className="details">
        <div className="name">{product.name}</div>
        <div className="ean">{product.ean}</div>
      </div>
      <div className="actions">
        <button onClick={() => onEdit(product)} className="edit-button">✎</button>
        <button onClick={() => onDelete(product)} className="delete-button">🗑</button>
      </div>
    </div>
  );
};

export default ProductItem;
