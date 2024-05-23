const { useState, useEffect } = React;

const FormularioProducto = ({ producto, manejarCambio, manejarEnvio, estaEditando, manejarCancelar }) => {
    return (
        <form onSubmit={manejarEnvio}>
            <input
                type="text"
                name="nombre"
                value={producto.nombre}
                onChange={manejarCambio}
                placeholder="Nombre del Producto"
                required
            />
            <input
                type="text"
                name="codigo"
                value={producto.codigo}
                onChange={manejarCambio}
                placeholder="Código del Producto"
                required
                disabled={estaEditando}
            />
            <input
                type="number"
                name="cantidad"
                value={producto.cantidad}
                onChange={manejarCambio}
                placeholder="Cantidad"
                required
                min="0"
                max="100"
            />
            <div className="acciones-form">
                <button type="submit">{estaEditando ? 'Actualizar' : 'Agregar'}</button>
                {estaEditando && <button type="button" onClick={manejarCancelar}>Cancelar</button>}
            </div>
        </form>
    );
};

const Producto = ({ producto, actualizarProducto, eliminarProducto }) => {
    const [estaEditando, setEstaEditando] = useState(false);
    const [productoActual, setProductoActual] = useState(producto);

    useEffect(() => {
        setProductoActual(producto);
    }, [producto]);

    const manejarCambio = (e) => {
        const { name, value } = e.target;
        setProductoActual({ ...productoActual, [name]: value });
    };

    const manejarEnvio = (e) => {
        e.preventDefault();
        actualizarProducto(productoActual);
        setEstaEditando(false);
    };

    const manejarCancelar = () => {
        setEstaEditando(false);
    };

    const incrementarCantidad = () => {
        if (productoActual.cantidad < 100) {
            const nuevoProducto = { ...productoActual, cantidad: productoActual.cantidad + 1 };
            setProductoActual(nuevoProducto);
            actualizarProducto(nuevoProducto);
        }
    };

    return (
        <div className="producto-tarjeta">
            {estaEditando ? (
                <FormularioProducto
                    producto={productoActual}
                    manejarCambio={manejarCambio}
                    manejarEnvio={manejarEnvio}
                    estaEditando={estaEditando}
                    manejarCancelar={manejarCancelar}
                />
            ) : (
                <>
                    <div className="producto-cantidad" onClick={incrementarCantidad}>
                        {producto.cantidad}
                    </div>
                    <div className="producto-detalles">
                        <h2>{producto.nombre}</h2>
                        <p>{producto.codigo}</p>
                    </div>
                    <div className="producto-acciones">
                        <button onClick={() => setEstaEditando(true)}>
                            <i className="fas fa-edit"></i>
                        </button>
                        <button onClick={() => eliminarProducto(producto.codigo)}>
                            <i className="fas fa-trash-alt"></i>
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

const ListaProductos = () => {
    const [productos, setProductos] = useState([]);
    const [nuevoProducto, setNuevoProducto] = useState({ nombre: '', codigo: '', cantidad: 0 });
    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    useEffect(() => {
        const productosAlmacenados = JSON.parse(localStorage.getItem('productos')) || [];
        setProductos(productosAlmacenados);
    }, []);

    useEffect(() => {
        localStorage.setItem('productos', JSON.stringify(productos));
    }, [productos]);

    const manejarCambioNuevoProducto = (e) => {
        const { name, value } = e.target;
        setNuevoProducto({ ...nuevoProducto, [name]: value });
    };

    const manejarEnvioNuevoProducto = (e) => {
        e.preventDefault();
        const productosActualizados = [...productos, nuevoProducto];
        setProductos(ordenarProductosPorNombre(productosActualizados));
        setNuevoProducto({ nombre: '', codigo: '', cantidad: 0 });
        setMostrarFormulario(false);
    };

    const actualizarProducto = (productoActualizado) => {
        const productosActualizados = productos.map(producto =>
            producto.codigo === productoActualizado.codigo ? productoActualizado : producto
        );
        setProductos(ordenarProductosPorNombre(productosActualizados));
    };

    const eliminarProducto = (codigo) => {
        const productosActualizados = productos.filter(producto => producto.codigo !== codigo);
        setProductos(ordenarProductosPorNombre(productosActualizados));
    };

    const ordenarProductosPorNombre = (productos) => {
        return productos.sort((a, b) => a.nombre.localeCompare(b.nombre));
    };

    return (
        <div>
            <h1>Control de Depósito</h1>
            {mostrarFormulario ? (
                <FormularioProducto
                    producto={nuevoProducto}
                    manejarCambio={manejarCambioNuevoProducto}
                    manejarEnvio={manejarEnvioNuevoProducto}
                    estaEditando={false}
                />
            ) : (
                <div className="agregar-producto-icono" onClick={() => setMostrarFormulario(true)}>
                    <i className="fas fa-plus-circle"></i>
                </div>
            )}
            <div className="producto-container">
                {productos.map(producto => (
                    <Producto
                        key={producto.codigo}
                        producto={producto}
                        actualizarProducto={actualizarProducto}
                        eliminarProducto={eliminarProducto}
                    />
                ))}
            </div>
        </div>
    );
};

ReactDOM.createRoot(document.getElementById('root')).render(<ListaProductos />);
