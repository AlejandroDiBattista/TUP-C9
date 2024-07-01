import './App.css'
import { useFetch } from './useFetch'

function App() {
  let [cargando, datos] = useFetch('https://jsonplaceholder.typicode.com/users')
  
  return (
    <>
      {cargando && <h1>Cargando...</h1>}
      {datos.map(dato => (
        <div key={dato.id}>
          <p>{dato.name}</p>
          <p>{dato.email}</p>
        </div>
      ))}
    </>
  )
}

export default App
