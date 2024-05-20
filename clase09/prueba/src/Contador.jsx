import { useContador } from './useContador';

 function Contador() {
  let { count, incrementar, decrementar } = useContador();
  return (
    <div>
      <p>Contador: {count}</p>
      <button onClick={incrementar}>Incrementar</button>
      <button onClick={decrementar}>Decrementar</button>
    </div>
  );
}

export { Contador };