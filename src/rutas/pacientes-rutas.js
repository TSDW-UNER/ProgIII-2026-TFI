import express from 'express';
import PacientesControlador from "../controladores/pacientes-controlador.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import {
    validarCrearPaciente,
    validarEditarPaciente,
    validarIdPaciente
} from "../validaciones/pacientes-validacion.js";

const router = express.Router();
const controlador = new PacientesControlador();

router.get('/', controlador.buscarTodos);

router.get('/:id_paciente', validarIdPaciente, validarCampos, controlador.buscarPorId);

router.post('/', validarCrearPaciente, validarCampos, controlador.crear);

router.put('/:id_paciente', validarEditarPaciente, validarCampos, controlador.modificarPorId);

router.delete('/:id_paciente', validarIdPaciente, validarCampos, controlador.eliminarPorId);

export { router };