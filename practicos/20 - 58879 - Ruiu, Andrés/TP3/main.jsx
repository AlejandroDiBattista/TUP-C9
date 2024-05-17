const { useState } = React

const ProductosIniciales = [
    { id: 1, nombre: "7UP", cantidad: 7, codigo: "7700000000000" },
    { id: 2, nombre: "Coca Cola", cantidad: 92, codigo: "7700000000001" },
    { id: 3, nombre: "Fanta", cantidad: 5, codigo: "7700000000002" },
    { id: 4, nombre: "Manaos", cantidad: 1, codigo: "7700000000003" },
    { id: 5, nombre: "Mirinda", cantidad: 6, codigo: "7700000000004" },
    { id: 6, nombre: "Pepsi Cola", cantidad: 3, codigo: "7700000000005" },
    { id: 7, nombre: "Sprite", cantidad: 4, codigo: "7700000000006" },
];

function Producto({ producto, alGuardar, alBorrar }) {
    const [editando, setEditando] = useState(false);
    const [nombre, setNombre] = useState(producto.nombre);
    const [cantidad, setCantidad] = useState(producto.cantidad);
    const [codigo, setCodigo] = useState(producto.codigo);

    const guardar = () => {
        alGuardar({ ...producto, nombre, cantidad, codigo });
        setEditando(false);
    };

    const cancelar = () => {
        setEditando(false);
        setNombre(producto.nombre);
        setCantidad(producto.cantidad);
        setCodigo(producto.codigo);
    };

    return (
        <div className="card">
            {editando ? (
                <form className="editar">
                    <div className="inputs">
                        <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} />
                        <input type="text" value={codigo} onChange={e => setCodigo(e.target.value)} />
                        <input type="number" value={cantidad} onChange={e => setCantidad(parseInt(e.target.value, 10))} />
                    </div>
                    <div className="botones">
                        <button type="button" onClick={guardar}>Guardar</button>
                        <button type="button" onClick={cancelar}>Cancelar</button>
                    </div>
                </form>
            ) : (
                <>
                    <div className="cantidad">
                        <span>{cantidad}</span>
                    </div>
                    <div className="datos">
                        <span style={{ fontWeight: "bold", fontSize: "1.5rem" }}>{nombre}</span>
                        <span>{codigo}</span>
                    </div>
                    <div className="iconos">
                        <i onClick={() => setEditando(true)} class="fa-regular fa-pen-to-square"></i>
                        <i onClick={() => alBorrar(producto.id)} class="fa-solid fa-trash"></i>
                    </div>
                </>
            )}
        </div>
    );
}

function Editar({ alGuardar, alCancelar, producto }) {
    const [nombre, setNombre] = useState(producto.nombre);
    const [cantidad, setCantidad] = useState(producto.cantidad);
    const [codigo, setCodigo] = useState(producto.codigo);

    const guardar = (e) => {
        e.preventDefault();
        alGuardar({ nombre, cantidad, codigo });
    };

    return (
        <form className="crear">
            <div className="inputs">
                <label>Crear Producto:</label>
                <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} />
                <input type="number" value={cantidad} onChange={e => setCantidad(parseInt(e.target.value, 10))} />
                <input type="text" value={codigo} onChange={e => setCodigo(e.target.value)} />
            </div>
            <div className="botones">
                <button onClick={guardar}>Guardar</button>
                <button onClick={alCancelar}>Cancelar</button>
            </div>
        </form>
    );
}

function App() {
    let [editando, setEditando] = useState(false);
    let [productos, setProductos] = useState(ProductosIniciales);
    let [producto, setProducto] = useState({ nombre: '', cantidad: 0, codigo: '' });

    const guardar = (productoEditado) => {
        if (productoEditado.id) {
            const copia = productos.map(p => p.id === productoEditado.id ? productoEditado : p);
            setProductos(copia);
        } else {
            const id = productos.length + 1;
            const nuevoProducto = { ...productoEditado, id };
            setProductos([...productos, nuevoProducto]);
        }
        setEditando(false);
    };

    const cancelar = () => {
        setEditando(false);
    };

    const agregar = () => {
        const ultimoCodigo = productos[productos.length - 1].codigo;
        const siguienteCodigo = (parseInt(ultimoCodigo, 10) + 1).toString().padStart(13, '0');
        setProducto({ nombre: '', cantidad: 0, codigo: siguienteCodigo });
        setEditando(true);
    };

    const borrar = (id) => {
        let copia = productos.filter(producto => producto.id !== id);
        setProductos(copia);
    };

    return (
        <div className="container">
            <header>
                <h1 style={{ display: editando ? 'none' : 'block' }}>Control Depósito</h1>
                {
                    editando ?
                        <Editar
                            alGuardar={guardar}
                            alCancelar={cancelar}
                            producto={producto}
                        />
                        : <i onClick={agregar} class="fa-regular fa-square-plus"></i>
                }
            </header>
            {
                productos.map(producto => (
                    <Producto
                        key={producto.id}
                        producto={producto}
                        alGuardar={guardar}
                        alBorrar={borrar}
                    />
                ))
            }
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);