import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { testConexion } from "./db/test-conexion.js";
import { manejarErrores } from "./middlewares/manejar-errores.js";
import { router as v1EspecialidadesRutas } from "./rutas/especialidades-rutas.js";
import { router as v1EstadisticasRutas } from "./rutas/estadisticas-rutas.js";
import { router as v1ObrasSocialesRutas} from "./rutas/obras-sociales-rutas.js";
import { router as v1MedicosRutas } from "./rutas/medicos-rutas.js";
import { router as v1PacientesRutas } from "./rutas/pacientes-rutas.js";
import {router as v1TurnosReservas } from "./rutas/turnos-reservas-rutas.js"
import { swaggerUi, specs } from "./swagger.js";

const app = express();

await testConexion();

app.use(express.json());

/*
|--------------------------------------------------------------------------
| RUTA TEST
|--------------------------------------------------------------------------
*/
app.get('/', (req,res) => {

    console.log('test get');

    res.status(200).json({
        estado: true,
        mensaje: 'API ok'
    });
});

/*
|--------------------------------------------------------------------------
| RUTAS API
|--------------------------------------------------------------------------
*/
app.use('/api/v1/especialidades', v1EspecialidadesRutas);
app.use('/api/v1/estadisticas', v1EstadisticasRutas);
app.use('/api/v1/obras-sociales', v1ObrasSocialesRutas);
app.use('/api/v1/medicos', v1MedicosRutas);
app.use('/api/v1/pacientes', v1PacientesRutas);
app.use('/api/v1/turnos-reservas', v1TurnosReservas);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

/*
|--------------------------------------------------------------------------
| MIDDLEWARE GLOBAL DE ERRORES
|--------------------------------------------------------------------------
*/
app.use(manejarErrores);

const PUERTO = process.env.PUERTO;

/*
|--------------------------------------------------------------------------
| INICIAR SERVIDOR
|--------------------------------------------------------------------------
*/
app.listen(PUERTO || 3000, () => {

    console.log(`Servidor iniciado en puerto ${PUERTO}`);
});