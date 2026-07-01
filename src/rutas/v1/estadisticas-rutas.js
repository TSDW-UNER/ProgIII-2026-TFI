import express from "express";

import EstadisticasControlador from "../../controladores/estadisticas-controlador.js";

const router = express.Router();

const estadisticasControlador = new EstadisticasControlador();

/*
|--------------------------------------------------------------------------
| ESTADÍSTICAS TURNOS
|--------------------------------------------------------------------------
*/
router.get(
    '/turnos',
    estadisticasControlador.obtenerTurnos
);

/*
|--------------------------------------------------------------------------
| PDF ESTADÍSTICAS
|--------------------------------------------------------------------------
*/
router.get(
    '/pdf',
    estadisticasControlador.generarPDF
);

export { router };