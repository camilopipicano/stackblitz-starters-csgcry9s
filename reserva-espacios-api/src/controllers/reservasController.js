
const data = require('../data/reservas');
const espacios = require('../data/espacios');

const minutos = h => { const [a, b] = h.split(':').map(Number); return a * 60 + b; };
const fechaOk = f => /^\d{4}-\d{2}-\d{2}$/.test(f);
const horaOk = h => /^([01]\d|2[0-3]):[0-5]\d$/.test(h);

function validar(r) {
  if (!r.espacioId || !r.solicitante || !r.fecha || !r.horaInicio || !r.horaFin)
    return 'Todos los campos son obligatorios';
  if (!espacios.obtenerPorId(r.espacioId)) return 'El espacio no existe';
  if (!fechaOk(r.fecha)) return 'La fecha debe tener formato YYYY-MM-DD';
  if (!horaOk(r.horaInicio) || !horaOk(r.horaFin)) return 'Las horas deben tener formato HH:MM';
  if (minutos(r.horaFin) <= minutos(r.horaInicio)) return 'La hora fin debe ser posterior a la hora inicio';
  return null;
}

// Cruce: nuevaInicio < existenteFin Y nuevaFin > existenteInicio
const hayCruce = (e, n) =>
  e.estado === 'activa' &&
  e.espacioId === n.espacioId &&
  e.fecha === n.fecha &&
  minutos(n.horaInicio) < minutos(e.horaFin) &&
  minutos(n.horaFin) > minutos(e.horaInicio);

const normalizar = (b, base = {}) => ({
  espacioId: Number(b.espacioId ?? base.espacioId),
  solicitante: String(b.solicitante ?? base.solicitante ?? '').trim(),
  fecha: b.fecha ?? base.fecha,
  horaInicio: b.horaInicio ?? base.horaInicio,
  horaFin: b.horaFin ?? base.horaFin
});

exports.listar = (req, res) => {
  const { espacioId, solicitante, fecha } = req.query;
  let r = data.obtenerTodas();
  if (espacioId) r = r.filter(x => x.espacioId === Number(espacioId));
  if (solicitante) r = r.filter(x => x.solicitante.toLowerCase() === solicitante.toLowerCase());
  if (fecha) r = r.filter(x => x.fecha === fecha);
  res.json(r);
};

exports.obtener = (req, res) => {
  const r = data.obtenerPorId(Number(req.params.id));
  if (!r) return res.status(404).json({ error: 'Reserva no encontrada' });
  res.json(r);
};

exports.crear = (req, res) => {
  const nueva = normalizar(req.body ?? {});
  const error = validar(nueva);
  if (error) return res.status(400).json({ error });
  if (data.obtenerTodas().some(e => hayCruce(e, nueva)))
    return res.status(409).json({ error: 'El espacio ya está reservado en ese horario' });
  res.status(201).json(data.crear({ ...nueva, estado: 'activa' }));
};

exports.actualizar = (req, res) => {
  const id = Number(req.params.id);
  const existente = data.obtenerPorId(id);
  if (!existente) return res.status(404).json({ error: 'Reserva no encontrada' });
  if (existente.estado === 'cancelada')
    return res.status(409).json({ error: 'No se puede editar una reserva cancelada' });

  const nueva = normalizar(req.body ?? {}, existente);
  const error = validar(nueva);
  if (error) return res.status(400).json({ error });
  if (data.obtenerTodas().some(e => e.id !== id && hayCruce(e, nueva)))
    return res.status(409).json({ error: 'La modificación genera un conflicto de horario' });
  res.json(data.actualizar(id, nueva));
};

exports.cancelar = (req, res) => {
  const r = data.cancelar(Number(req.params.id));
  if (!r) return res.status(404).json({ error: 'Reserva no encontrada' });
  res.json(r);
};
