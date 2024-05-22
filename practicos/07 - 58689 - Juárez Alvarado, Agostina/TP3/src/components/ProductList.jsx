import React from 'react';
import ProductItem from './ProductItem';
import './ProductList.css';

const ProductList = ({ products, onIncrement, onEdit, onDelete }) => {
  return (
    <div className="product-list">
      {products.sort((a, b) => a.name.localeCompare(b.name)).map((product) => (
        <ProductItem
          key={product.ean}
          product={product}
          onIncrement={onIncrement}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default ProductList;
