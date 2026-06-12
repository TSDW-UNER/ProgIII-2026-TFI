import express from 'express';
import ObrasSocialesControlador from "../controladores/obras-sociales-controlador.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import {
    validarCrearObraSocial,
    validarEditarObraSocial,
    validarIdObraSocial
} from "../validaciones/obras-sociales-validacion.js";

const router = express.Router();
const controlador = new ObrasSocialesControlador();

router.get('/', controlador.buscarTodas);

router.get('/:id_obra_social', validarIdObraSocial, validarCampos, controlador.buscarPorId);

router.post('/', validarCrearObraSocial, validarCampos, controlador.crear);

router.put('/:id_obra_social', validarEditarObraSocial, validarCampos, controlador.modificarPorId);

router.delete('/:id_obra_social', validarIdObraSocial, validarCampos, controlador.eliminarPorId);

export { router };