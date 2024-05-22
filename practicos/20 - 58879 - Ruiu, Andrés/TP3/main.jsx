const { useState } = React

const ProductosIniciales = [
    { id: 1, nombre: "Fanta", cantidad: 5, codigo: "7700000000002" },
    { id: 2, nombre: "7UP", cantidad: 7, codigo: "7700000000000" },
    { id: 3, nombre: "Coca Cola", cantidad: 92, codigo: "7700000000001" },
    { id: 4, nombre: "Manaos", cantidad: 1, codigo: "7700000000003" },
    { id: 5, nombre: "Mirinda", cantidad: 6, codigo: "7700000000004" },
    { id: 6, nombre: "Pepsi Cola", cantidad: 3, codigo: "7700000000005" },
    { id: 7, nombre: "Sprite", cantidad: 4, codigo: "7700000000006" },
];

function Producto({ producto, alGuardar, alBorrar, incrementarCantidad }) {
    const [editando, setEditando] = useState(false);

    const iniciarEdicion = () => {
        setEditando(true);
    };

    const manejarGuardar = (productoEditado) => {
        alGuardar({ ...producto, ...productoEditado });
        setEditando(false);
    };

    const manejarCancelar = () => {
        setEditando(false);
    };

    return (
        <div className="card">
            {editando ? (
                <Editar
                    producto={producto}
                    alGuardar={manejarGuardar}
                    alCancelar={manejarCancelar}
                />
            ) : (
                <>
                    <div className="cantidad">
                        <div className="cantidad">
                            <span onClick={() => incrementarCantidad(producto.id)}>{producto.cantidad}</span>
                        </div>
                    </div>
                    <div className="datos">
                        <span style={{ fontWeight: "bold", fontSize: "1.5rem" }}>{producto.nombre}</span>
                        <span>{producto.codigo}</span>
                    </div>
                    <div className="iconos">
                        <i onClick={iniciarEdicion} class="fa-regular fa-pen-to-square"></i>
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
                <input type="text" value={nombre} placeholder="Nombre del producto" onChange={e => setNombre(e.target.value)} />
                <input type="number" value={cantidad} placeholder="Cantidad del producto" onChange={e => setCantidad(parseInt(e.target.value, 10))} />
                <input type="number" value={codigo} onChange={e => setCodigo(e.target.value)} />
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
    let [productos, setProductos] = useState(() => {
        const productosGuardados = localStorage.getItem('productos');
        return productosGuardados ? JSON.parse(productosGuardados) : ProductosIniciales;
    });
    let [producto, setProducto] = useState({ nombre: '', cantidad: 0, codigo: '' });

    const guardar = (productoEditado) => {
        let nuevosProductos;
        if (productoEditado.id) {
            nuevosProductos = productos.map(p => p.id === productoEditado.id ? productoEditado : p);
        } else {
            const id = productos.length + 1;
            const nuevoProducto = { ...productoEditado, id };
            nuevosProductos = [...productos, nuevoProducto];
        }
        setProductos(nuevosProductos);
        localStorage.setItem('productos', JSON.stringify(nuevosProductos));
        setEditando(false);
    };

    const cancelar = () => {
        setEditando(false);
    };

    const agregar = () => {
        const siguienteCodigo = () => Math.floor(Math.random() * 10000000000000);
        setProducto({ nombre: '', cantidad: 0, codigo: siguienteCodigo() });
        setEditando(true);
    };

    const borrar = (id) => {
        const nuevosProductos = productos.filter(producto => producto.id !== id);
        setProductos(nuevosProductos);
        localStorage.setItem('productos', JSON.stringify(nuevosProductos));
    };

    const incrementarCantidad = (id) => {
        const nuevosProductos = productos.map(producto => {
            if (producto.id === id) {
                return { ...producto, cantidad: producto.cantidad + 1 };
            }
            return producto;
        });
        setProductos(nuevosProductos);
        localStorage.setItem('productos', JSON.stringify(nuevosProductos));
    };

    const productosOrdenados = [...productos].sort((a, b) => a.nombre.localeCompare(b.nombre));

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
                productosOrdenados.length > 0 ?
                    productosOrdenados.map(producto => (
                        <Producto
                            key={producto.id}
                            producto={producto}
                            alGuardar={guardar}
                            alBorrar={borrar}
                            incrementarCantidad={incrementarCantidad}
                        />
                    ))
                    : <h2>No hay productos en este momento</h2>
            }
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);