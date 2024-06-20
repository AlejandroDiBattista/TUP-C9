import Aplicacion from './app.js';

Aplicacion.listen(3000, () => {
  console.log('El servidor está ejecutándose en http://localhost:3000');
});