const { useState } = React

const TareasIniciales = [
    { id: 1, descripcion: "Enseñar ABM" },
    { id: 2, descripcion: "Enseñar React" },
    { id: 3, descripcion: "Enseñar Redux" },
    { id: 4, descripcion: "Enseñar Node.js" },
]

function Tarea({ id, descripcion, alEditar, alBorrar }) {
    return (
        <div className="card">
            <div>{descripcion} {(id)}</div>
            <button onClick={() => alEditar(id)}>Editar</button>
            <button onClick={() => alBorrar(id)}>Borrar</button>
        </div>
    )
}

function Editar({ tarea, alGuardar, alCancelar }) {
    let [descripcion, setDescripcion] = useState(tarea.descripcion)
    const guardar = (e) => {
        e.preventDefault()
        alGuardar({ ...tarea, descripcion })
    }
    const cancelar = (e) => {
        e.preventDefault()
        alCancelar()
    }
    return (
        <form className='card'>
            <label>Editar tarea:</label>
            <input type="text"
                value={descripcion}
                onChange={e => setDescripcion(e.target.value)}
            />
            <button onClick={guardar}>Guardar</button>
            <button onClick={cancelar}>Cancelar</button>
        </form>
    )

}

const { createRoot } = ReactDOM

function proximoId(tareas) {
    return Math.max(...tareas.map(tarea => tarea.id)) + 1
}
function App() {
    let [editando, setEditando] = useState(false)
    let [tareas, setTareas] = useState(TareasIniciales)
    let [tarea, setTarea] = useState({ descripcion: '' })
    const guardar = (tarea) => {
        console.log("Guardando", tarea)
        if (tarea.id) {
            // Modificación
            let copia = tareas.map(
                t => t.id === tarea.id ? tarea : t)
            setTareas(copia)
            setEditando(false)
            return
        } else {
            // Alta
            let id = proximoId(tareas)
            let copia = [...tareas, { ...tarea, id }]
            setTareas(copia)
            setEditando(false)
        }
    }
    const cancelar = () => {
        setEditando(false)
    }

    const agregar = () => {
        setTarea({ descripcion: '' })
        setEditando(true)
    }

    const borrar = (id) => {
        console.log("Borrando", id)
        let copia = tareas.filter(tarea => tarea.id !== id)
        setTareas(copia)
    }

    const editar = (id) => {
        const tarea = tareas.find(t => t.id === id)
        setTarea(tarea)
        setEditando(true)
    }
    return (
        <div>
            <h1>Tareas</h1>
            {editando ?
                <Editar tarea={tarea}
                    alGuardar={guardar}
                    alCancelar={cancelar}
                />
                : <button onClick={agregar}>Agregar</button>
            }
            {
                tareas.map(tarea =>
                    <Tarea
                        key={tarea.id}
                        {...tarea}
                        alEditar={editar}
                        alBorrar={borrar}
                    />)
            }
        </div>
    )
}


const root = createRoot(document.getElementById('root'))
root.render(<App />);
