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
        <div className="card" onClick={() => incrementarCantidad(producto.id)} style={{ display: editando ? 'block' : 'flex' }}>
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
                            <span>{producto.cantidad}</span>
                        </div>
                    </div>
                    <div className="datos">
                        <span style={{ fontWeight: "bold", fontSize: "1.5rem" }}>{producto.nombre}</span>
                        <span>{producto.codigo}</span>
                    </div>
                    <div className="iconos">
                        <i onClick={(e) => { e.stopPropagation(); iniciarEdicion(); }} class="fa-regular fa-pen-to-square"></i>
                        <i onClick={(e) => { e.stopPropagation(); alBorrar(producto.id); }} class="fa-regular fa-trash-can"></i>
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
    const [errorCantidad, setErrorCantidad] = useState('');
    const [errorCantidadRango, setErrorCantidadRango] = useState('');
    const [errorCodigo, setErrorCodigo] = useState('');
    const [errorNombre, setErrorNombre] = useState('');

    async function guardar(e) {
        e.preventDefault();
        let error = false;

        if (nombre === '') {
            setErrorNombre('El nombre no puede estar vacío');
            error = true;
        }

        if (cantidad === '' || isNaN(cantidad)) {
            setErrorCantidad('La cantidad no puede estar vacía');
            error = true;
        } else if (cantidad < 0 || cantidad > 100) {
            setErrorCantidadRango('La cantidad debe ser un número entre 0 y 100');
            error = true;
        }

        if (codigo === '') {
            setErrorCodigo('El código no puede estar vacío');
            error = true;
        } else if (!/^\d{13}$/.test(codigo)) {
            setErrorCodigo('El código debe ser un número de 13 dígitos');
            error = true;
        }

        await new Promise(resolve => setTimeout(resolve, 0));

        if (!error) {
            alGuardar({ nombre, cantidad, codigo });
        }
    }

    return (
        <form className="crear" onClick={(e) => e.stopPropagation()}>
            <div className="inputs">
                <input type="text" value={nombre} placeholder="Nombre del producto" onChange={e => { setNombre(e.target.value); setErrorNombre(''); }} />
                {errorNombre && <p className="error">{errorNombre}</p>}
                <input type="number" value={cantidad} placeholder="Cantidad del producto" onChange={e => { setCantidad(parseInt(e.target.value, 10)); setErrorCantidad(''); setErrorCantidadRango(''); }} min="0" max="100" />
                {errorCantidad && <p className="error">{errorCantidad}</p>}
                {errorCantidadRango && <p className="error">{errorCantidadRango}</p>}
                <input type="text" value={codigo} placeholder="Codigo EAN" onChange={e => { setCodigo(e.target.value); setErrorCodigo(''); }} pattern="\d{13}" />
                {errorCodigo && <p className="error">{errorCodigo}</p>}
            </div>
            <div className="botones">
                <button onClick={(e) => { guardar(e); }}>Guardar</button>
                <button onClick={(e) => { alCancelar(); }}>Cancelar</button>
            </div>
        </form>
    );
}

function App() {
    let [editando, setEditando] = useState(false);
    let [productos, setProductos] = useState(() => {
        const productosGuardados = localStorage.getItem('productos');
        if (productosGuardados) {
            return JSON.parse(productosGuardados).map(p => ({
                ...p,
                cantidad: parseInt(p.cantidad, 10)
            }));
        }
        return ProductosIniciales;
    });
    let [producto, setProducto] = useState({ nombre: '', cantidad: 0, codigo: '' });
    let [ultimoId, setUltimoId] = useState(productos.length);
    const guardar = (productoEditado) => {
        let nuevosProductos;
        if (productoEditado.id) {
            nuevosProductos = productos.map(p => p.id === productoEditado.id ? productoEditado : p);
        } else {
            const id = ultimoId + 1;
            const nuevoProducto = { ...productoEditado, id };
            nuevosProductos = [...productos, nuevoProducto];
            setUltimoId(id);
        }
        setProductos(nuevosProductos);
        localStorage.setItem('productos', JSON.stringify(nuevosProductos));
        setEditando(false);
    };

    const cancelar = () => {
        setEditando(false);
    };

    const agregar = () => {
        setProducto({ nombre: '', cantidad: '', codigo: '' });
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
                if (producto.cantidad < 100) {
                    return { ...producto, cantidad: producto.cantidad + 1 };
                }
            }
            return producto;
        });
        setProductos(nuevosProductos);
        localStorage.setItem('productos', JSON.stringify(nuevosProductos));
    };

    const productosOrdenados = [...productos].sort((a, b) => a.nombre.localeCompare(b.nombre));

    return (
        <div className="container">
            <header style={{ flexDirection: editando ? 'column' : 'row' }}>
                <h1 >Control Depósito</h1>
                {
                    editando ?
                        <div style={{ marginBottom: editando ? '8px' : '0', width: "100%" }}>
                            <Editar
                                alGuardar={guardar}
                                alCancelar={cancelar}
                                producto={producto}
                            />
                        </div>
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
                    : <h2 style={editando ? { display: "none" } : { display: "block" }} >No hay productos en este momento</h2>
            }
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);