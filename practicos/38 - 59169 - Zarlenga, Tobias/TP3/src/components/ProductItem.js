import React, { useState } from 'react';
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa';

function ProductItem({ product, incrementQuantity, editProduct, deleteProduct }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState(product);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  const handleSave = () => {
    editProduct(editedProduct);
    setIsEditing(false);
  };

  return (
    <div className="product-item">
      {isEditing ? (
        <div>
          <input
            type="text"
            name="name"
            value={editedProduct.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="ean"
            value={editedProduct.ean}
            onChange={handleChange}
          />
          <input
            type="number"
            name="quantity"
            value={editedProduct.quantity}
            onChange={handleChange}
          />
          <button onClick={handleSave}>Guardar</button>
          <button onClick={() => setIsEditing(false)}>Cancelar</button>
        </div>
      ) : (
        <div>
          <span>{product.name}</span>
          <span>{product.ean}</span>
          <span>{product.quantity}</span>
          <button onClick={() => incrementQuantity(product.id)}>
            <FaPlus />
          </button>
          <button onClick={() => setIsEditing(true)}>
            <FaEdit />
          </button>
          <button onClick={() => deleteProduct(product.id)}>
            <FaTrash />
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductItem;
