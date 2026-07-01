import express from 'express';
import MedicosControlador from "../../controladores/medicos-controlador.js";
import { validarCampos } from "../../middlewares/validar-campos.js";
import {
    validarCrearMedico,
    validarEditarMedico,
    validarIdMedico,
    validarAsociarObrasSociales
} from "../../validaciones/medicos-validacion.js";
import {
    esAutenticado,
    verificarRol
} from "../../middlewares/auth-middleware.js";
import { subirFoto } from "../../middlewares/subir-foto.js";

const router = express.Router();
const controlador = new MedicosControlador();

router.get('/', esAutenticado, verificarRol([2,3]), controlador.buscarTodos);

router.get('/:id_medico', esAutenticado, verificarRol([2,3]), validarIdMedico, validarCampos, controlador.buscarPorId);

router.post(
    '/',
    esAutenticado,
    verificarRol([3]), // Admin
    subirFoto,
    validarCrearMedico,
    validarCampos,
    controlador.crear
);


router.put(
    '/:id_medico',
    esAutenticado,
    verificarRol([3]),
    subirFoto,
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

router.post('/:id_medico/obras-sociales', esAutenticado, verificarRol([3]), validarAsociarObrasSociales, validarCampos, controlador.asociarMedicoObrasSociales);

export { router };