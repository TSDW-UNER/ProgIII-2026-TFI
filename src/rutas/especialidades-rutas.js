import express from 'express';

import EspecialidadesControlador from "../controladores/especialidades-controlador.js";

import {
    validarCrearEspecialidad,
    validarEditarEspecialidad,
    validarIdEspecialidad
} from "../validaciones/especialidades-validacion.js";

import { validarCampos } from "../middlewares/validar-campos.js";

import {
    esAutenticado,
    verificarRol
} from "../middlewares/auth-middleware.js";

const router = express.Router();

const especialidadesControlador = new EspecialidadesControlador();

/*
|--------------------------------------------------------------------------
| BUSCAR TODAS
|--------------------------------------------------------------------------
*/
router.get(
    '/',
    esAutenticado,
    verificarRol([2,3]),
    especialidadesControlador.buscarTodas,
);

/*
|--------------------------------------------------------------------------
| BUSCAR POR ID
|--------------------------------------------------------------------------
*/
router.get(
    '/:id_especialidad',
    esAutenticado,
    verificarRol([2,3]),
    validarIdEspecialidad,
    validarCampos,
    especialidadesControlador.buscarPorId
);

/*
|--------------------------------------------------------------------------
| CREAR ESPECIALIDAD
|--------------------------------------------------------------------------
*/
router.post(
    '/',
    esAutenticado,
    verificarRol([3]),
    validarCrearEspecialidad,
    validarCampos,
    especialidadesControlador.crear
);

/*
|--------------------------------------------------------------------------
| MODIFICAR ESPECIALIDAD
|--------------------------------------------------------------------------
*/
router.put(
    '/:id_especialidad',
    esAutenticado,
    verificarRol([3]),
    validarEditarEspecialidad,
    validarCampos,
    especialidadesControlador.modificarPorId
);

/*
|--------------------------------------------------------------------------
| ELIMINAR ESPECIALIDAD
|--------------------------------------------------------------------------
*/
router.delete(
    '/:id_especialidad',
    esAutenticado,
    verificarRol([3]),
    validarIdEspecialidad,
    validarCampos,
    especialidadesControlador.eliminarPorId
);

export { router };