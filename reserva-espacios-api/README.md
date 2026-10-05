# API de Reserva de Espacios Académicos
Integrantes: <nombres>

API REST con Node.js y Express para gestionar reservas de espacios académicos (datos en memoria).

## Uso
```bash
npm install
npm start
```

## Endpoints
GET /api/espacios · GET /api/espacios/:id · GET /api/espacios/:id/disponibilidad?fecha=YYYY-MM-DD
GET /api/reservas (filtros: espacioId, solicitante, fecha) · GET /api/reservas/:id
POST /api/reservas · PUT /api/reservas/:id · DELETE /api/reservas/:id

## Ejemplo
```bash
curl -X POST URL_RENDER/api/reservas -H "Content-Type: application/json" \
 -d '{"espacioId":1,"solicitante":"Camilo","fecha":"2026-10-10","horaInicio":"08:00","horaFin":"10:00"}'
```

## Regla de negocio
No se permiten dos reservas activas solapadas en el mismo espacio y fecha.

Repositorio: URL_GITHUB · Despliegue: URL_RENDER
