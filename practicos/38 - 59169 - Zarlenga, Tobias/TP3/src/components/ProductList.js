import React from 'react';
import ProductItem from './ProductItem';

function ProductList({ products, incrementQuantity, editProduct, deleteProduct }) {
  return (
    <div className="product-list" style={{ height: products.length * 80 + 'px' }}>
      {products.sort((a, b) => a.name.localeCompare(b.name)).map(product => (
        <ProductItem
          key={product.id}
          product={product}
          incrementQuantity={incrementQuantity}
          editProduct={editProduct}
          deleteProduct={deleteProduct}
        />
      ))}
    </div>
  );
}

export default ProductList;

