function App() {
  let [mensaje, setMensaje] = React.useState('');
  
  async function traer(ruta, metodo = "GET", body = {}) {
    let res = await fetch(ruta, {
      method: metodo,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    let data = await res.text();
    setMensaje(data);
  }

	async function usuarios() {
		// let res = await fetch('/usuarios');
		// let data = await res.json();
    // setMensaje(data);
    traer('/usuarios');
	}

	async function registrar() {
		let usuario = { user: 'adibattista', password: '4444' };

		// let res = await fetch('/registrar', {
		// 	method: 'POST',
		// 	headers: { 'Content-Type': 'application/json' },
		// 	body: JSON.stringify(usuario),
		// });
		// let data = await res.text();
    // setMensaje(data);
    traer('/registrar', 'POST', usuario);
	}

	async function login() {
		let usuario = { user: 'adibattista', password: '4444' };

    traer('/login', 'POST', usuario);
		// let res = await fetch('/login', {
		// 	method: 'POST',
		// 	headers: { 'Content-Type': 'application/json' },
		// 	body: JSON.stringify(usuario),
		// });
		// let data = await res.text();
		// setMensaje(data);
	}

	async function logout() {
		// let res = await fetch('/logout', { method: 'POST' });
		// let data = await res.text();
    // setMensaje(data);
    traea('/logout', 'POST');
	}
	async function ver() {
		// let res = await fetch('/info', { method: 'GET' });
		// let data = await res.text();
    // setMensaje(data);
    traer('/info');
	}

	return (
		<div>
			<h1>Demo Login</h1>
			<button onClick={usuarios}>Ver usuarios</button>
			<button onClick={registrar}>Registrar</button>
			<button onClick={login}>Login</button>
			<button onClick={logout}>Logout</button>
			<button onClick={ver}>Ver</button>

			<pre>{mensaje}</pre>
		</div>
	);
}
