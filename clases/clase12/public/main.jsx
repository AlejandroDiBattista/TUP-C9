function App() {
  let [valor, setValor] = useState(0)

  async function leer() {
    let res = await fetch("/valor")
    let dato = await res.json()
    console.log("4", dato)
    setValor( dato.valor )
  }

  async function incrementar() {
    let res = await fetch("/incrementar",
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ incremento: 7 })
      })
    
    let dato = await res.json()
    console.log("4", dato)
    setValor(dato.valor)
  }

  return (
    <div>
      <h1>Probando nuevo</h1>
      <button onClick={leer}>Leer</button>
      <button onClick={incrementar}>Incrementar</button>
      <h2>El contador es: {valor}</h2>
    </div>
  );
}