import { useEffect, useState } from 'react';

export function useFetch(url) {
  let [datos, setDatos] = useState([]);
  let [cargando, setCargando] = useState(false);

  function bajar() {
    setCargando(true);
    fetch(url)
      .then(response => response.json())
      .then(json => setDatos(json))
      .finally(() => setCargando(false));
  }

  useEffect(() => {
    bajar();
  }, []);

  return [cargando, datos];
}
