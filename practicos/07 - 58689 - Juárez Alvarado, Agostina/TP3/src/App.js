import React, { useState } from 'react';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import EditProduct from './components/EditProduct';
import './App.css';

const App = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleAddProduct = (product) => {
    setProducts([...products, product]);
  };

  const handleIncrement = (product) => {
    setProducts(products.map(p => p.ean === product.ean ? { ...p, quantity: p.quantity + 1 } : p));
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleSave = (product) => {
    setProducts(products.map(p => p.ean === product.ean ? product : p));
    setEditingProduct(null);
  };

  const handleCancel = () => {
    setEditingProduct(null);
  };

  const handleDelete = (product) => {
    setProducts(products.filter(p => p.ean !== product.ean));
  };

  return (
    <div className="App">
      <h1>Control Depósito</h1>
      {editingProduct ? (
        <EditProduct product={editingProduct} onSave={handleSave} onCancel={handleCancel} />
      ) : (
        <ProductForm onAddProduct={handleAddProduct} />
      )}
      <ProductList
        products={products}
        onIncrement={handleIncrement}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default App;
