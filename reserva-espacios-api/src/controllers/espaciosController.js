
const data = require('../data/espacios');
const reservasData = require('../data/reservas');

exports.listar = (req, res) => res.json(data.obtenerTodos());

exports.obtener = (req, res) => {
  const espacio = data.obtenerPorId(Number(req.params.id));
  if (!espacio) return res.status(404).json({ error: 'Espacio no encontrado' });
  res.json(espacio);
};

exports.disponibilidad = (req, res) => {
  const id = Number(req.params.id);
  const { fecha } = req.query;
  const espacio = data.obtenerPorId(id);
  if (!espacio) return res.status(404).json({ error: 'Espacio no encontrado' });
  if (!fecha) return res.status(400).json({ error: 'La fecha es obligatoria' });

  const reservas = reservasData.obtenerTodas()
    .filter(r => r.espacioId === id && r.fecha === fecha && r.estado === 'activa');
  res.json({ espacio, fecha, disponible: reservas.length === 0, reservas });
};
