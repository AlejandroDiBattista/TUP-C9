import React, { useState, useEffect } from 'react';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products'));
    if (storedProducts) setProducts(storedProducts);
  }, []);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  const addProduct = (product) => {
    const existingProduct = products.find(p => p.ean === product.ean);
    if (existingProduct) {
      setProducts(products.map(p =>
        p.ean === product.ean ? { ...p, quantity: p.quantity + 1 } : p
      ));
    } else {
      setProducts([...products, product]);
    }
  };

  const incrementQuantity = (id) => {
    setProducts(products.map(product =>
      product.id === id ? { ...product, quantity: product.quantity + 1 } : product
    ));
  };

  const editProduct = (editedProduct) => {
    setProducts(products.map(product =>
      product.id === editedProduct.id ? editedProduct : product
    ));
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  return (
    <div className="App">
      <h1>Inventario del Depósito</h1>
      <ProductForm addProduct={addProduct} />
      <ProductList
        products={products}
        incrementQuantity={incrementQuantity}
        editProduct={editProduct}
        deleteProduct={deleteProduct}
      />
    </div>
  );
}

export default App;
