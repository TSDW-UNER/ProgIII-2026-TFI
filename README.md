Programación 3 - 2026 - TFI
Trabajo Final Integrador de Programación 3 en 2026, de la Tecnicatura Universitaria en Desarrollo Web de la FCAD-UNER
Recuperatorio

GRUPO R
Federico Almaraz, Facundo Di Braida, Micaela Celeste Ballejo, Juan Ignacio Peretto, Joaquín Priotti

---

# API Turnos Médicos

## Instalación

```bash
npm install
```

## Ejecutar proyecto

```bash
npm run dev
```

## Endpoints


### Especialidades

| Método | Endpoint | Descripción |

| GET | /api/v1/especialidades | Obtener todas |
| GET | /api/v1/especialidades/:id_especialidad | Obtener por id |
| POST | /api/v1/especialidades | Crear |
| PUT | /api/v1/especialidades/:id_especialidad | Modificar |
| DELETE | /api/v1/especialidades/:id_especialidad | Eliminar |


### Estadísticas

| Método | Endpoint |

| GET | /api/v1/estadisticas/turnos |
| GET | /api/v1/estadisticas/pdf |


## Tecnologías

- Node.js
- Express
- MySQL
- PDFKit
- express-validator