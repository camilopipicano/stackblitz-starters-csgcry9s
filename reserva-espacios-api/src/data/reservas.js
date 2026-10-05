
const reservas = [];
let siguienteId = 1;

const obtenerTodas = () => reservas;
const obtenerPorId = id => reservas.find(r => r.id === id);

function crear(datos) {
  const reserva = { id: siguienteId++, ...datos };
  reservas.push(reserva);
  return reserva;
}

function actualizar(id, datos) {
  const r = obtenerPorId(id);
  return r ? Object.assign(r, datos) : null;
}

function cancelar(id) {
  return actualizar(id, { estado: 'cancelada' });
}

module.exports = { obtenerTodas, obtenerPorId, crear, actualizar, cancelar };