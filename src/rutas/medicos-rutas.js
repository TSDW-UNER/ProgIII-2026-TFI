import express from 'express';
import MedicosControlador from "../controladores/medicos-controlador.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import {
    validarCrearMedico,
    validarEditarMedico,
    validarIdMedico
} from "../validaciones/medicos-validacion.js";

const router = express.Router();
const controlador = new MedicosControlador();

router.get('/', controlador.buscarTodos);

router.get('/:id_medico', validarIdMedico, validarCampos, controlador.buscarPorId);

router.post('/', validarCrearMedico, validarCampos, controlador.crear);

router.put('/:id_medico', validarEditarMedico, validarCampos, controlador.modificarPorId);

router.delete('/:id_medico', validarIdMedico, validarCampos, controlador.eliminarPorId);

export { router };