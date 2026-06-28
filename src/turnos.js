import dotenv from "dotenv";
dotenv.config();

import express from "express";
import morgan from "morgan";
import cors from "cors";
import passport from "passport";

import { testConexion } from "./db/test-conexion.js";
import { manejarErrores } from "./middlewares/manejar-errores.js";
import { estrategia, validacion} from './config/passport.js';

import { router as v1EspecialidadesRutas } from "./rutas/especialidades-rutas.js";
import { router as v1EstadisticasRutas } from "./rutas/estadisticas-rutas.js";
import { router as v1ObrasSocialesRutas } from "./rutas/obras-sociales-rutas.js";
import { router as v1MedicosRutas } from "./rutas/medicos-rutas.js";
import { router as v1PacientesRutas } from "./rutas/pacientes-rutas.js";
import { router as v1TurnosReservas } from "./rutas/turnos-reservas-rutas.js";

import { router as v1AuthRutas } from "./rutas/auth-rutas.js";
import { swaggerUi, specs } from "./swagger.js";
const app = express();

await testConexion();

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs)
);

/*
|--------------------------------------------------------------------------
| MIDDLEWARES GLOBALES
|--------------------------------------------------------------------------
*/
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

/*
|--------------------------------------------------------------------------
| RUTA TEST
|--------------------------------------------------------------------------
*/
app.get('/', (req, res) => {

    console.log('test get');

    res.status(200).json({
        estado: true,
        mensaje: 'API ok'
    });
});

/*
|--------------------------------------------------------------------------
| CONFIG PASSPORT
|--------------------------------------------------------------------------
*/

passport.use(estrategia);
passport.use(validacion);
app.use(passport.initialize());

/*
|--------------------------------------------------------------------------
| RUTAS API
|--------------------------------------------------------------------------
*/

// LOGIN JWT
app.use('/api/v1/auth', v1AuthRutas);

app.use('/api/v1/especialidades', passport.authenticate('jwt', {session:false}), v1EspecialidadesRutas);
app.use('/api/v1/estadisticas', v1EstadisticasRutas);
app.use('/api/v1/obras-sociales', v1ObrasSocialesRutas);
app.use('/api/v1/medicos', v1MedicosRutas);
app.use('/api/v1/pacientes', v1PacientesRutas);
app.use('/api/v1/turnos-reservas', passport.authenticate('jwt', {session:false}), v1TurnosReservas);


/*
|--------------------------------------------------------------------------
| MIDDLEWARE GLOBAL DE ERRORES
|--------------------------------------------------------------------------
*/
app.use(manejarErrores);

const PUERTO = process.env.PORT;

/*
|--------------------------------------------------------------------------
| INICIAR SERVIDOR
|--------------------------------------------------------------------------
*/
app.listen(PUERTO || 3000, () => {

    console.log(`Servidor iniciado en puerto ${PUERTO}`);
});