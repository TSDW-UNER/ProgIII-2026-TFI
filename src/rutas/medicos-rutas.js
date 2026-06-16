import express from 'express';
import MedicosControlador from "../controladores/medicos-controlador.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import {
    validarCrearMedico,
    validarEditarMedico,
    validarIdMedico,
    validarAsociarObrasSociales
} from "../validaciones/medicos-validacion.js";
import {
    esAutenticado,
    verificarRol
} from "../auth/auth-middleware.js";

const router = express.Router();
const controlador = new MedicosControlador();

router.get('/', controlador.buscarTodos);

router.get('/:id_medico', validarIdMedico, validarCampos, controlador.buscarPorId);

router.post(
    '/',
    esAutenticado,
    verificarRol([3]), // Admin
    validarCrearMedico,
    validarCampos,
    controlador.crear
);


router.put(
    '/:id_medico',
    esAutenticado,
    verificarRol([3]),
    validarEditarMedico,
    validarCampos,
    controlador.modificarPorId
);

router.delete(
    '/:id_medico',
    esAutenticado,
    verificarRol([3]),
    validarIdMedico,
    validarCampos,
    controlador.eliminarPorId
);

router.post('/:id_medico/obras-sociales', validarAsociarObrasSociales, validarCampos, controlador.asociarMedicoObrasSociales);

export { router };