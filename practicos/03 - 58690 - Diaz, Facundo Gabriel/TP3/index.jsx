const { useState, useEffect } = React;
// App.jsx

function Product({ name, ean, quantity, onEdit, onDelete }) {
  const [editMode, setEditMode] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedEan, setEditedEan] = useState(ean);
  const [editedQuantity, setEditedQuantity] = useState(quantity);

  const handleEdit = () => {
    onEdit({ name: editedName, ean: editedEan, quantity: editedQuantity });
    setEditMode(false);
  };

  return (
    <div className="product-container">
      {editMode ? (
        <div>
          <input value={editedName} onChange={(e) => setEditedName(e.target.value)} />
          <input value={editedEan} onChange={(e) => setEditedEan(e.target.value)} />
          <input type="number" value={editedQuantity} onChange={(e) => setEditedQuantity(e.target.value)} />
          <button onClick={handleEdit}>Guardar</button>
        </div>
      ) : (
        <div className="product-details">
          <div>{name}</div>
          <div>{ean}</div>
          <div style={{ fontSize: '20px' }}>{quantity}</div>
          <div className="product-actions">
          <div className="product-actions">
          <button className="edit-button" onClick={() => setEditMode(true)}>Editar</button>
          <button className="delete-button" onClick={onDelete}>Eliminar</button>
        </div>

          </div>
        </div>
      )}
    </div>
  );
}

function App() {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState('');
  const [productEan, setProductEan] = useState('');
  const [productQuantity, setProductQuantity] = useState('');

  const handleNameChange = (event) => {
    setProductName(event.target.value);
  };

  const handleEanChange = (event) => {
    setProductEan(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setProductQuantity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setProducts([...products, { name: productName, ean: productEan, quantity: parseInt(productQuantity) }]);
    setProductName('');
    setProductEan('');
    setProductQuantity('');
  };

  const editProduct = (index, updatedProduct) => {
    const updatedProducts = [...products];
    updatedProducts[index] = updatedProduct;
    setProducts(updatedProducts.sort((a, b) => a.name.localeCompare(b.name)));
  };

  const deleteProduct = (index) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };

  return (
    <div className="inventory-container">
      <form onSubmit={handleSubmit}>
        <label>
          Nombre del Producto:
          <input type="text" value={productName} onChange={handleNameChange} />
        </label>
        <br />
        <label>
          Código EAN:
          <input type="text" value={productEan} onChange={handleEanChange} />
        </label>
        <br />
        <label>
          Cantidad:
          <input type="number" value={productQuantity} onChange={handleQuantityChange} />
        </label>
        <br />
        <button type="submit">Agregar Producto</button>
      </form>
      {products.map((product, index) => (
        <Product
          key={index}
          name={product.name}
          ean={product.ean}
          quantity={product.quantity}
          onEdit={(updatedProduct) => editProduct(index, updatedProduct)}
          onDelete={() => deleteProduct(index)}
        />
      ))}
    </div>
  );
}

// index.jsx
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
