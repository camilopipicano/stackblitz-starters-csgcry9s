
const express = require('express');
const app = express();

app.disable('x-powered-by');
app.use(express.json());

app.get('/', (req, res) => res.json({ nombre: 'API de Reservas Académicas', estado: 'operativa' }));
app.use('/api/espacios', require('./src/routes/espacios'));
app.use('/api/reservas', require('./src/routes/reservas'));
app.use((req, res) => res.status(404).json({ error: 'Ruta no encontrada' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => console.log(`Servidor activo en el puerto ${PORT}`));
