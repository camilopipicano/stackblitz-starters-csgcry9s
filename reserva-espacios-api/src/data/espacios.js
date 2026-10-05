
const espacios = [
  { id: 1, nombre: 'Laboratorio de Sistemas', ubicacion: 'Bloque A - 204', capacidad: 30 },
  { id: 2, nombre: 'Sala de Estudio 1', ubicacion: 'Biblioteca - Piso 2', capacidad: 12 },
  { id: 3, nombre: 'Sala de Estudio 2', ubicacion: 'Biblioteca - Piso 2', capacidad: 10 }
];

module.exports = {
  obtenerTodos: () => espacios,
  obtenerPorId: id => espacios.find(e => e.id === id)
};
