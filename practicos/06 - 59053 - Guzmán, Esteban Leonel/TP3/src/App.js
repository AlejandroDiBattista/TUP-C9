import React, { useState } from 'react';
import './App.css';



function ProductInventory() {
  const [products, setProducts] = useState([]);

  const [newProduct, setNewProduct] = useState({ name: '', ean: '', quantity: 0 });

  const [editableIndex, setEditableIndex] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const addProduct = () => {
    const sortedProducts = [...products, { ...newProduct }];
    sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    setProducts(sortedProducts);
    setNewProduct({ name: '', ean: '', quantity: 0 });
  };


  const deleteProduct = (indexToDelete) => {
    console.log('Productos antes de la eliminación:', products);
  
    const updatedProducts = products.filter((product, index) => index !== indexToDelete);
  
    console.log('Productos después de la eliminación:', updatedProducts);
  
    setProducts(updatedProducts);
  };
  
  const handleIncrement = (index) => {
    const updatedProducts = [...products];
    updatedProducts[index].quantity++;
    setProducts(updatedProducts);
  };

  const toggleEdit = (index) => {
    setEditableIndex(editableIndex === index ? null : index);
  };

  const handleEditProduct = (index, field, value) => {
    const updatedProducts = [...products];
    updatedProducts[index][field] = value;
    setProducts(updatedProducts);
  };

  return (
    <div className="container">
      <h1>Inventario de Productos</h1>
     
      <div className="product-list">
        {products.map((product, index) => (
  <div key={index} className="product-item">
    <div className="product-details">
      <span className="product-quantity" onClick={() => handleIncrement(index)}>
        {product.quantity}
      </span>
      <span className="product-name">{product.name}</span>
      <span className="product-ean">{product.ean}</span> {/* Aquí agregamos el código EAN */}
    </div>
    <div className="product-actions">
      <button onClick={() => toggleEdit(index)}>
        {editableIndex === index ? 'Guardar' : 'Modificar'}
      </button>
      <button onClick={() => deleteProduct(index)}>Eliminar</button>
    </div>
    {editableIndex === index && (
      <div className="edit-product">
        <input
          type="text"
          value={product.name}
          onChange={(e) => handleEditProduct(index, 'name', e.target.value)}
          className="product-input edit-input"
        />
        <input
          type="text"
          value={product.ean}
          onChange={(e) => handleEditProduct(index, 'ean', e.target.value)}
          className="product-input edit-input"
        />
        <input
          type="number"
          value={product.quantity}
          onChange={(e) => handleEditProduct(index, 'quantity', parseInt(e.target.value))}
          className="product-input edit-input"
        />
      </div>
    )}



            
          </div>
        ))}
      </div>

      <div className="add-product">
        <h2>Agregar Nuevo Producto</h2>
        <input type="text" name="name" placeholder="Nombre" value={newProduct.name} onChange={handleInputChange} className="product-input" />
        <input type="text" name="ean" placeholder="Código EAN" value={newProduct.ean} onChange={handleInputChange} className="product-input" />
        <input type="number" name="quantity" placeholder="Cantidad" value={newProduct.quantity} onChange={handleInputChange} className="product-input" />
        <button onClick={addProduct}>Agregar Producto</button>
      </div>
    </div>
  );
}

export default ProductInventory;
